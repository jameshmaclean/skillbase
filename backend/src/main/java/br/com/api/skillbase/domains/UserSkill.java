package br.com.api.skillbase.domains;

import br.com.api.skillbase.security.domains.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="user_skill")
public class UserSkill {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="uskil_cd_id")
	private Long idUserSkill;
	
	@ManyToOne
    @JoinColumn(name = "fk_usr_cd_id")
    private User usuario;
	
    @ManyToOne
    @JoinColumn(name = "fk_ski_cd_id")
    private Skill skill;
    
    @Column(name="uskill_nm_level")
    private Integer level;

    //CONSTRUTORES
	public UserSkill(Long idUserSkill, User usuario, Skill skill, Integer level) {
		this.idUserSkill = idUserSkill;
		this.usuario = usuario;
		this.skill = skill;
		this.level = level;
	}
    
	public UserSkill() {
		
	}
	
	//GETTERS E SETTERS
	public Long getIdUserSkill() {
		return idUserSkill;
	}

	public void setIdUserSkill(Long id) {
		this.idUserSkill = id;
	}

	public User getUsuario() {
		return usuario;
	}

	public void setUsuario(User usuario) {
		this.usuario = usuario;
	}

	public Skill getSkill() {
		return skill;
	}

	public void setSkill(Skill skill) {
		this.skill = skill;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}
}
