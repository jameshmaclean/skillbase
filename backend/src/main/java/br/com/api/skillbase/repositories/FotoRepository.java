package br.com.api.skillbase.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.api.skillbase.domains.Foto;
import br.com.api.skillbase.domains.Skill;

public interface FotoRepository extends JpaRepository<Foto, Long> {

	Optional<Foto> findBySkill(Skill skill);

}
