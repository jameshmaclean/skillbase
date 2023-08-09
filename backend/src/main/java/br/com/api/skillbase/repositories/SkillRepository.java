package br.com.api.skillbase.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.api.skillbase.domains.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {

}
