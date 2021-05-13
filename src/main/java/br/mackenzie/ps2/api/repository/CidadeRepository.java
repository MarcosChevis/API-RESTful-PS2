package br.mackenzie.ps2.api.repository;

import org.springframework.data.repository.CrudRepository;

import br.mackenzie.ps2.api.entity.Cidade;

public interface CidadeRepository extends CrudRepository<Cidade, Long> {

}
