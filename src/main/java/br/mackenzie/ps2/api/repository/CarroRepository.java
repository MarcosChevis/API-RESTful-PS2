package br.mackenzie.ps2.api.repository;

import org.springframework.data.repository.CrudRepository;

import br.mackenzie.ps2.api.entity.Carro;

public interface CarroRepository extends CrudRepository<Carro, Long> {

}
