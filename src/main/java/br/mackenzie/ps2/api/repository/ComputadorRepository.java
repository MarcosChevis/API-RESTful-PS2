package br.mackenzie.ps2.api.repository;

import org.springframework.data.repository.CrudRepository;

import br.mackenzie.ps2.api.entity.Computador;

public interface ComputadorRepository extends CrudRepository<Computador, Long> {

}
