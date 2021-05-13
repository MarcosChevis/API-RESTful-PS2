package br.mackenzie.ps2.api.entity;

import javax.persistence.*;

@Entity
@Table(name = "computadores")
public class Computador {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	long id;
	@Column(nullable = false)
	String marca;
	@Column(nullable = false)
	String processador;
	@Column(nullable = false)
	int qtdRamMB;
	@Column(nullable = false)
	int tamanhoDiscoGB;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getProcessador() {
		return processador;
	}

	public void setProcessador(String processador) {
		this.processador = processador;
	}

	public int getQtdRamMB() {
		return qtdRamMB;
	}

	public void setQtdRamMB(int qtdRamMB) {
		this.qtdRamMB = qtdRamMB;
	}

	public int getTamanhoDiscoGB() {
		return tamanhoDiscoGB;
	}

	public void setTamanhoDiscoGB(int tamanhoDiscoGB) {
		this.tamanhoDiscoGB = tamanhoDiscoGB;
	}

}
