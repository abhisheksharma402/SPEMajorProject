package com.spe.project.travelguide.main.Package;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PackageRepository extends JpaRepository<PackageEntity, Integer> {

    List<PackageEntity> findByDestination(String destination);

}
