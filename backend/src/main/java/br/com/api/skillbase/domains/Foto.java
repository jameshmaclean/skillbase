package br.com.api.skillbase.domains;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "fotos")
public class Foto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "fot_cd_id")
	private Long idFoto;

	@Lob
	@Column(name = "fot_tx_dados")
	private byte[] dados;

	@Column(name = "fot_tx_tipo")
	private String tipo;

	@Column(name = "fot_tx_nome")
	private String nome;

	@OneToOne
	@JoinColumn(name = "fk_ski_cd_id")
	private Skill skill;

	//CONSTRUTORES
	public Foto(Long idFoto, byte[] dados, String tipo, String nome, Skill skill) {
		this.idFoto = idFoto;
		this.dados = dados;
		this.tipo = tipo;
		this.nome = nome;
		this.skill = skill;
	}

	public Foto() {
	}
	
	//GETTERS E SETTERS
	public Long getIdFoto() {
		return idFoto;
	}

	public void setIdFoto(Long idFoto) {
		this.idFoto = idFoto;
	}

	public byte[] getDados() {
		return dados;
	}

	public void setDados(byte[] dados) {
		this.dados = dados;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Skill getSkill() {
		return skill;
	}

	public void setSkill(Skill skill) {
		this.skill = skill;
	}

}
