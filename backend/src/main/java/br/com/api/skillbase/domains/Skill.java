package br.com.api.skillbase.domains;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="skills")
public class Skill {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ski_cd_id")
	private Long idSkill;
	
	@Column(name="ski_tx_nome")
	private String nome;
	
	@Column(name="ski_tx_descricao")
	private String descricao;
	
	@Column(name="ski_tx_url")
	private String imagemURL;

	//CONSTRUTORES
	public Skill() {
		
	}
	
	public Skill(Long idSkill, String nome, String descricao, String imagemURL) {
		this.idSkill = idSkill;
		this.nome = nome;
		this.descricao = descricao;
		this.imagemURL = imagemURL;
	}

	//GETTER E SETTERS
	public Long getIdSkill() {
		return idSkill;
	}

	public void setIdSkill(Long id) {
		this.idSkill = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getImagemURL() {
		return imagemURL;
	}

	public void setImagemURL(String imagemURL) {
		this.imagemURL = imagemURL;
	}

}
