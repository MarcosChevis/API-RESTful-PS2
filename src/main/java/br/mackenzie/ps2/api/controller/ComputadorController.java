package br.mackenzie.ps2.api.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import br.mackenzie.ps2.api.entity.Computador;
import br.mackenzie.ps2.api.entityDto.ComputadorDTO;
import br.mackenzie.ps2.api.repository.ComputadorRepository;

@RestController
@RequestMapping("/api")
public class ComputadorController {

	@Autowired
	ComputadorRepository repositorio;

	@PostMapping("/computadores")
	public Computador create(@RequestBody Computador computador) {
		String marca = computador.getMarca();
		String processador = computador.getProcessador();
		int qtdRamMB = computador.getQtdRamMB();
		int tamanhoDiscoGB = computador.getTamanhoDiscoGB();

		boolean erro = false;

		erro = erro || marca == null || marca.trim().equals("");
		erro = erro || processador == null || processador.trim().equals("");
		erro = erro || qtdRamMB == 0;
		erro = erro || tamanhoDiscoGB == 0;

		if (erro) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
		}

		return repositorio.save(computador);
	}

	@GetMapping("/computadores")
	public ArrayList<ComputadorDTO> readAll() {
		Iterable<Computador> ccomputadores = repositorio.findAll();
		ArrayList<ComputadorDTO> allComputadores = new ArrayList<ComputadorDTO>();

		for (Computador ccomputador : ccomputadores) {
			ComputadorDTO ccomputadorDTO = new ComputadorDTO();

			ccomputadorDTO.setId(ccomputador.getId());
			ccomputadorDTO.setMarca(ccomputador.getMarca());
			ccomputadorDTO.setProcessador(ccomputador.getProcessador());
			allComputadores.add(ccomputadorDTO);
		}

		return allComputadores;
	}

	@GetMapping("/computadores/{id}")
	public Computador readById(@PathVariable long id) {
		try {
			Optional<Computador> op = repositorio.findById(id);

			if (op.isPresent())
				return op.get();

		} catch (Exception ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao tentar buscar", ex);
		}

		throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	}

	@GetMapping("computadores/computador")
	@ResponseBody
	public ArrayList<Computador> getComputadoresBymarca(@RequestParam String marca) {

		Iterable<Computador> computadores = repositorio.findAll();

		ArrayList<Computador> filteredComputadores = new ArrayList<Computador>();
		for (Computador computador : computadores) {
			if (computador.getMarca().contains(marca)) {
				filteredComputadores.add(computador);

			}
		}
		return filteredComputadores;
	}

	@PutMapping("/computadores/{id}")
	public Computador update(@RequestBody Computador computador, @PathVariable long id) {
		try {
			Optional<Computador> op = repositorio.findById(id);

			if (op.isPresent()) {
				Computador c = op.get();

				String marca = computador.getMarca();
				String processador = computador.getProcessador();
				int qtdRamMB = computador.getQtdRamMB();
				int tamanhoDiscoGB = computador.getTamanhoDiscoGB();

				if (marca != null)
					c.setMarca(marca);
				if (processador != null)
					c.setProcessador(processador);
				if (qtdRamMB != 0)
					c.setQtdRamMB(qtdRamMB);
				if (tamanhoDiscoGB != 0)
					c.setTamanhoDiscoGB(tamanhoDiscoGB);

				return repositorio.save(c);
			}

		} catch (Exception ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao tentar atualizar", ex);
		}

		throw new ResponseStatusException(HttpStatus.NOT_FOUND);

	}

	@DeleteMapping(value = "/computadores/{id}", produces = "application/json")
	public Computador delete(@PathVariable long id) {
		try {
			Optional<Computador> op = repositorio.findById(id);

			if (op.isPresent()) {
				repositorio.deleteById(id);
				return op.get();
			}

		} catch (Exception ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao tentar apagar", ex);
		}

		throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	}

}
