package br.mackenzie.ps2.api.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import br.mackenzie.ps2.api.entity.Carro;
import br.mackenzie.ps2.api.entityDto.CarroDTO;
import br.mackenzie.ps2.api.repository.CarroRepository;

@RestController
@RequestMapping("/api")
public class CarroController {

	@Autowired
	CarroRepository repositorio;

	@PostMapping("/carros")
	public Carro create(@RequestBody Carro carro) {
		String modelo = carro.getModelo();
		String marca = carro.getMarca();
		String categoria = carro.getCategoria();
		int ano = carro.getAno();

		boolean erro = false;

		erro = erro || modelo == null || modelo.trim().equals("");
		erro = erro || marca == null || marca.trim().equals("");
		erro = erro || categoria == null || categoria.trim().equals("");
		erro = erro || ano == 0;

		if (erro) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
		}

		return repositorio.save(carro);
	}

	@GetMapping("/carros")
	public ArrayList<CarroDTO> readAll() {
		Iterable<Carro> carros = repositorio.findAll();
		ArrayList<CarroDTO> allCarros = new ArrayList<CarroDTO>();

		for (Carro carro : carros) {
			CarroDTO carroDTO = new CarroDTO();

			carroDTO.setId(carro.getId());
			carroDTO.setMarca(carro.getMarca());
			carroDTO.setModelo(carro.getModelo());

			allCarros.add(carroDTO);
		}

		return allCarros;
	}


	@GetMapping("/carros/{id}")
	public Carro readById(@PathVariable long id) {
		try {
			Optional<Carro> op = repositorio.findById(id);

			if (op.isPresent())
				return op.get();

		} catch (Exception ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao tentar buscar", ex);
		}

		throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	}
	
//---------------------------------------------------------------------------------------------------------------------

	@GetMapping("carros/carro")
	@ResponseBody
	public ArrayList<Carro> getCarrosByMarca(@RequestParam String marca) {

		Iterable<Carro> carros = repositorio.findAll();

		ArrayList<Carro> filteredCarros = new ArrayList<Carro>();

		for (Carro carro : carros) {

			if (carro.getMarca().contains(marca)) {
				filteredCarros.add(carro);

			}
		}

		return filteredCarros;
	}

	@PutMapping("/carros/{id}")
	public Carro update(@RequestBody Carro carro, @PathVariable long id) {
		try {
			Optional<Carro> op = repositorio.findById(id);

			if (op.isPresent()) {
				Carro c = op.get();

				String modelo = carro.getModelo();
				String marca = carro.getMarca();
				String categoria = carro.getCategoria();
				int ano = carro.getAno();

				if (modelo != null)
					c.setModelo(modelo);
				if (marca != null)
					c.setMarca(marca);
				if (categoria != null)
					c.setCategoria(categoria);
				if (ano != 0)
					c.setAno(ano);

				return repositorio.save(c);
			}

		} catch (Exception ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao tentar atualizar", ex);
		}

		throw new ResponseStatusException(HttpStatus.NOT_FOUND);

	}

	@DeleteMapping(value = "/carros/{id}", produces = "application/json")
	public Carro delete(@PathVariable long id) {
		try {
			Optional<Carro> op = repositorio.findById(id);

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
