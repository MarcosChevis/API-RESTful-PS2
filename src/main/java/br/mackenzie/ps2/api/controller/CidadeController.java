package br.mackenzie.ps2.api.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import br.mackenzie.ps2.api.entity.Cidade;
import br.mackenzie.ps2.api.entityDto.CidadeDTO;
import br.mackenzie.ps2.api.repository.CidadeRepository;

@RestController
@RequestMapping("/api")
public class CidadeController {

	@Autowired
	CidadeRepository repositorio;

	@PostMapping("/cidades")
	public Cidade create(@RequestBody Cidade cidade) {
		String nome = cidade.getNome();
		String estado = cidade.getEstado();
		String pais = cidade.getPais();
		int populacao = cidade.getPopulacao();

		boolean erro = false;

		erro = erro || nome == null || nome.trim().equals("");
		erro = erro || estado == null || estado.trim().equals("");
		erro = erro || pais == null || pais.trim().equals("");
		erro = erro || populacao == 0;

		if (erro) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
		}

		return repositorio.save(cidade);
	}

	@GetMapping("/cidades")
	public ArrayList<CidadeDTO> readAll() {
		Iterable<Cidade> cidades = repositorio.findAll();
		ArrayList<CidadeDTO> allCidades = new ArrayList<CidadeDTO>();

		for (Cidade cidade : cidades) {
			CidadeDTO cidadeDTO = new CidadeDTO();

			cidadeDTO.setId(cidade.getId());
			cidadeDTO.setNome(cidade.getNome());
			cidadeDTO.setEstado(cidade.getEstado());

			allCidades.add(cidadeDTO);
		}

		return allCidades;
	}

	@GetMapping("/cidades/{id}")
	public Cidade readById(@PathVariable long id) {
		try {
			Optional<Cidade> op = repositorio.findById(id);

			if (op.isPresent())
				return op.get();

		} catch (Exception ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao tentar buscar", ex);
		}

		throw new ResponseStatusException(HttpStatus.NOT_FOUND);
	}

	@GetMapping("cidades/cidade")
	@ResponseBody
	public ArrayList<Cidade> getCidadesByPais(@RequestParam String pais) {

		Iterable<Cidade> cidades = repositorio.findAll();

		ArrayList<Cidade> filteredCidades = new ArrayList<Cidade>();
		for (Cidade cidade : cidades) {

			if (cidade.getPais().contains(pais)) {
				filteredCidades.add(cidade);

			}

		}
		return filteredCidades;
	}

	@PutMapping("/cidades/{id}")
	public Cidade update(@RequestBody Cidade cidade, @PathVariable long id) {
		try {
			Optional<Cidade> op = repositorio.findById(id);

			if (op.isPresent()) {
				Cidade c = op.get();

				String nome = cidade.getNome();
				String estado = cidade.getEstado();
				String pais = cidade.getPais();
				int populacao = cidade.getPopulacao();

				if (nome != null)
					c.setNome(nome);
				if (estado != null)
					c.setEstado(estado);
				if (pais != null)
					c.setPais(pais);
				if (populacao != 0)
					c.setPopulacao(populacao);

				return repositorio.save(c);
			}

		} catch (Exception ex) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao tentar atualizar", ex);
		}

		throw new ResponseStatusException(HttpStatus.NOT_FOUND);

	}

	@DeleteMapping(value = "/cidades/{id}", produces = "application/json")
	public Cidade delete(@PathVariable long id) {
		try {
			Optional<Cidade> op = repositorio.findById(id);

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
