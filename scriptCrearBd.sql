-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema clinix
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema clinix
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `clinix` DEFAULT CHARACTER SET utf8mb3 ;
USE `clinix` ;

-- -----------------------------------------------------
-- Table `clinix`.`tb_persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinix`.`tb_persona` (
  `idtb_persona` INT NOT NULL AUTO_INCREMENT,
  `cedula` INT NOT NULL,
  `primerNombre` VARCHAR(200) NOT NULL,
  `segundoNombre` VARCHAR(200) NOT NULL,
  `primerApellido` VARCHAR(100) NOT NULL,
  `segundoApellido` VARCHAR(100) NOT NULL,
  `fechaNacimiento` DATE NOT NULL,
  `correoElectronio` VARCHAR(200) NOT NULL,
  `direccion` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`idtb_persona`),
  UNIQUE INDEX `cedula_UNIQUE` (`cedula` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 32
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `clinix`.`tb_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinix`.`tb_usuarios` (
  `idtb_usuarios` INT NOT NULL AUTO_INCREMENT,
  `nombreUsuario` VARCHAR(10) NOT NULL,
  `contrasenna` VARCHAR(16) NOT NULL,
  `estado` BIT(1) NOT NULL,
  `rolUsuario` VARCHAR(100) NOT NULL,
  `tb_persona_idtb_persona` INT NOT NULL,
  PRIMARY KEY (`idtb_usuarios`, `tb_persona_idtb_persona`),
  UNIQUE INDEX `contrasenna_UNIQUE` (`contrasenna` ASC) VISIBLE,
  INDEX `fk_tb_usuarios_tb_persona2_idx` (`tb_persona_idtb_persona` ASC) VISIBLE,
  CONSTRAINT `fk_tb_usuarios_tb_persona2`
    FOREIGN KEY (`tb_persona_idtb_persona`)
    REFERENCES `clinix`.`tb_persona` (`idtb_persona`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `clinix`.`tb_medicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinix`.`tb_medicos` (
  `idtb_medicos` INT NOT NULL AUTO_INCREMENT,
  `estado` BIT(1) NOT NULL,
  `especialidad` VARCHAR(200) NOT NULL,
  `tb_usuarios_idtb_usuarios` INT NOT NULL,
  `tb_usuarios_tb_persona_idtb_persona` INT NOT NULL,
  PRIMARY KEY (`idtb_medicos`, `tb_usuarios_idtb_usuarios`, `tb_usuarios_tb_persona_idtb_persona`),
  INDEX `fk_tb_medicos_tb_usuarios2_idx` (`tb_usuarios_idtb_usuarios` ASC, `tb_usuarios_tb_persona_idtb_persona` ASC) VISIBLE,
  CONSTRAINT `fk_tb_medicos_tb_usuarios2`
    FOREIGN KEY (`tb_usuarios_idtb_usuarios` , `tb_usuarios_tb_persona_idtb_persona`)
    REFERENCES `clinix`.`tb_usuarios` (`idtb_usuarios` , `tb_persona_idtb_persona`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `clinix`.`tb_pacientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinix`.`tb_pacientes` (
  `idtb_pacientes` INT NOT NULL AUTO_INCREMENT,
  `estado` BIT(1) NOT NULL,
  `tb_persona_idtb_persona` INT NOT NULL,
  PRIMARY KEY (`idtb_pacientes`, `tb_persona_idtb_persona`),
  INDEX `fk_tb_pacientes_tb_persona2_idx` (`tb_persona_idtb_persona` ASC) VISIBLE,
  CONSTRAINT `fk_tb_pacientes_tb_persona2`
    FOREIGN KEY (`tb_persona_idtb_persona`)
    REFERENCES `clinix`.`tb_persona` (`idtb_persona`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `clinix`.`tb_citas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinix`.`tb_citas` (
  `idtb_citas` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `hora` TIME NOT NULL,
  `estado` VARCHAR(20) NOT NULL,
  `tb_medicos_idtb_medicos` INT NOT NULL,
  `tb_medicos_tb_usuarios_idtb_usuarios` INT NOT NULL,
  `tb_medicos_tb_usuarios_tb_persona_idtb_persona` INT NOT NULL,
  `tb_pacientes_idtb_pacientes` INT NOT NULL,
  `tb_pacientes_tb_persona_idtb_persona` INT NOT NULL,
  PRIMARY KEY (`idtb_citas`, `tb_medicos_idtb_medicos`, `tb_medicos_tb_usuarios_idtb_usuarios`, `tb_medicos_tb_usuarios_tb_persona_idtb_persona`, `tb_pacientes_idtb_pacientes`, `tb_pacientes_tb_persona_idtb_persona`),
  INDEX `fk_tb_citas_tb_medicos2_idx` (`tb_medicos_idtb_medicos` ASC, `tb_medicos_tb_usuarios_idtb_usuarios` ASC, `tb_medicos_tb_usuarios_tb_persona_idtb_persona` ASC) VISIBLE,
  INDEX `fk_tb_citas_tb_pacientes2_idx` (`tb_pacientes_idtb_pacientes` ASC, `tb_pacientes_tb_persona_idtb_persona` ASC) VISIBLE,
  CONSTRAINT `fk_tb_citas_tb_medicos2`
    FOREIGN KEY (`tb_medicos_idtb_medicos` , `tb_medicos_tb_usuarios_idtb_usuarios` , `tb_medicos_tb_usuarios_tb_persona_idtb_persona`)
    REFERENCES `clinix`.`tb_medicos` (`idtb_medicos` , `tb_usuarios_idtb_usuarios` , `tb_usuarios_tb_persona_idtb_persona`),
  CONSTRAINT `fk_tb_citas_tb_pacientes2`
    FOREIGN KEY (`tb_pacientes_idtb_pacientes` , `tb_pacientes_tb_persona_idtb_persona`)
    REFERENCES `clinix`.`tb_pacientes` (`idtb_pacientes` , `tb_persona_idtb_persona`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `clinix`.`tb_proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinix`.`tb_proveedor` (
  `idtb_proveedor` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `estado` BIT(1) NOT NULL,
  `correoElectronico` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idtb_proveedor`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `clinix`.`tb_medicamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinix`.`tb_medicamentos` (
  `idtb_medicamentos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `descripcion` VARCHAR(500) NOT NULL,
  `fechaIngreso` DATE NOT NULL,
  `cantidad` INT NOT NULL,
  `precioCompra` DECIMAL(10,2) NOT NULL,
  `precioVenta` DECIMAL(10,2) NOT NULL,
  `tb_proveedor_idtb_proveedor` INT NOT NULL,
  PRIMARY KEY (`idtb_medicamentos`),
  INDEX `fk_tb_medicamentos_tb_proveedor2_idx` (`tb_proveedor_idtb_proveedor` ASC) VISIBLE,
  CONSTRAINT `fk_tb_medicamentos_tb_proveedor2`
    FOREIGN KEY (`tb_proveedor_idtb_proveedor`)
    REFERENCES `clinix`.`tb_proveedor` (`idtb_proveedor`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `clinix`.`tb_movimientosmedicamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinix`.`tb_movimientosmedicamentos` (
  `idtb_movimientosMedicamentos` INT NOT NULL AUTO_INCREMENT,
  `tipoMovimiento` VARCHAR(50) NOT NULL,
  `cantidad` INT NOT NULL,
  `fechaMovimiento` DATE NOT NULL,
  `montoMovimiento` DECIMAL(10,2) NOT NULL,
  `motivo` VARCHAR(500) NOT NULL,
  `tb_medicamentos_idtb_medicamentos` INT NOT NULL,
  PRIMARY KEY (`idtb_movimientosMedicamentos`, `tb_medicamentos_idtb_medicamentos`),
  INDEX `fk_tb_movimientosMedicamentos_tb_medicamentos1_idx` (`tb_medicamentos_idtb_medicamentos` ASC) VISIBLE,
  CONSTRAINT `fk_tb_movimientosMedicamentos_tb_medicamentos1`
    FOREIGN KEY (`tb_medicamentos_idtb_medicamentos`)
    REFERENCES `clinix`.`tb_medicamentos` (`idtb_medicamentos`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `clinix`.`tb_egresos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinix`.`tb_egresos` (
  `idtb_egresos` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL,
  `montoTotal` DECIMAL(10,2) NOT NULL,
  `numerofactura` INT NOT NULL,
  `tb_movimientosMedicamentos_idtb_movimientosMedicamentos` INT NOT NULL,
  `tb_movimientosMedicamentos_tb_medicamentos_idtb_medicamentos` INT NOT NULL,
  PRIMARY KEY (`idtb_egresos`),
  INDEX `fk_tb_egresos_tb_movimientosMedicamentos1_idx` (`tb_movimientosMedicamentos_idtb_movimientosMedicamentos` ASC, `tb_movimientosMedicamentos_tb_medicamentos_idtb_medicamentos` ASC) VISIBLE,
  CONSTRAINT `fk_tb_egresos_tb_movimientosMedicamentos1`
    FOREIGN KEY (`tb_movimientosMedicamentos_idtb_movimientosMedicamentos` , `tb_movimientosMedicamentos_tb_medicamentos_idtb_medicamentos`)
    REFERENCES `clinix`.`tb_movimientosmedicamentos` (`idtb_movimientosMedicamentos` , `tb_medicamentos_idtb_medicamentos`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `clinix`.`tb_facturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinix`.`tb_facturas` (
  `idtb_facturas` INT NOT NULL AUTO_INCREMENT,
  `montoTotal` DECIMAL(10,2) NOT NULL,
  `montoCita` DECIMAL(10,2) NOT NULL,
  `fechaEmision` DATE NOT NULL,
  `tb_movimientosMedicamentos_idtb_movimientosMedicamentos` INT NOT NULL,
  `tb_movimientosMedicamentos_tb_medicamentos_idtb_medicamentos` INT NOT NULL,
  `tb_citas_idtb_citas` INT NOT NULL,
  `tb_citas_tb_medicos_idtb_medicos` INT NOT NULL,
  `tb_citas_tb_medicos_tb_usuarios_idtb_usuarios` INT NOT NULL,
  `tb_citas_tb_medicos_tb_usuarios_tb_persona_idtb_persona` INT NOT NULL,
  `tb_citas_tb_pacientes_idtb_pacientes` INT NOT NULL,
  `tb_citas_tb_pacientes_tb_persona_idtb_persona` INT NOT NULL,
  PRIMARY KEY (`idtb_facturas`),
  INDEX `fk_tb_facturas_tb_movimientosMedicamentos1_idx` (`tb_movimientosMedicamentos_idtb_movimientosMedicamentos` ASC, `tb_movimientosMedicamentos_tb_medicamentos_idtb_medicamentos` ASC) VISIBLE,
  INDEX `fk_tb_facturas_tb_citas2_idx` (`tb_citas_idtb_citas` ASC, `tb_citas_tb_medicos_idtb_medicos` ASC, `tb_citas_tb_medicos_tb_usuarios_idtb_usuarios` ASC, `tb_citas_tb_medicos_tb_usuarios_tb_persona_idtb_persona` ASC, `tb_citas_tb_pacientes_idtb_pacientes` ASC, `tb_citas_tb_pacientes_tb_persona_idtb_persona` ASC) VISIBLE,
  CONSTRAINT `fk_tb_facturas_tb_citas2`
    FOREIGN KEY (`tb_citas_idtb_citas` , `tb_citas_tb_medicos_idtb_medicos` , `tb_citas_tb_medicos_tb_usuarios_idtb_usuarios` , `tb_citas_tb_medicos_tb_usuarios_tb_persona_idtb_persona` , `tb_citas_tb_pacientes_idtb_pacientes` , `tb_citas_tb_pacientes_tb_persona_idtb_persona`)
    REFERENCES `clinix`.`tb_citas` (`idtb_citas` , `tb_medicos_idtb_medicos` , `tb_medicos_tb_usuarios_idtb_usuarios` , `tb_medicos_tb_usuarios_tb_persona_idtb_persona` , `tb_pacientes_idtb_pacientes` , `tb_pacientes_tb_persona_idtb_persona`),
  CONSTRAINT `fk_tb_facturas_tb_movimientosMedicamentos1`
    FOREIGN KEY (`tb_movimientosMedicamentos_idtb_movimientosMedicamentos` , `tb_movimientosMedicamentos_tb_medicamentos_idtb_medicamentos`)
    REFERENCES `clinix`.`tb_movimientosmedicamentos` (`idtb_movimientosMedicamentos` , `tb_medicamentos_idtb_medicamentos`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `clinix`.`tb_horarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinix`.`tb_horarios` (
  `idtb_horarios` INT NOT NULL AUTO_INCREMENT,
  `horaIngreso` TIME NOT NULL,
  `horaSalida` TIME NOT NULL,
  `tipoHorario` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idtb_horarios`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `clinix`.`tb_infopacientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinix`.`tb_infopacientes` (
  `idtb_infoPacientes` INT NOT NULL AUTO_INCREMENT,
  `alergias` VARCHAR(200) NOT NULL,
  `enfermedades` VARCHAR(200) NOT NULL,
  `tb_pacientes_idtb_pacientes` INT NOT NULL,
  `tb_pacientes_tb_persona_idtb_persona` INT NOT NULL,
  PRIMARY KEY (`idtb_infoPacientes`),
  INDEX `fk_tb_infoPacientes_tb_pacientes1_idx` (`tb_pacientes_idtb_pacientes` ASC, `tb_pacientes_tb_persona_idtb_persona` ASC) VISIBLE,
  CONSTRAINT `fk_tb_infoPacientes_tb_pacientes1`
    FOREIGN KEY (`tb_pacientes_idtb_pacientes` , `tb_pacientes_tb_persona_idtb_persona`)
    REFERENCES `clinix`.`tb_pacientes` (`idtb_pacientes` , `tb_persona_idtb_persona`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `clinix`.`tb_ingersos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinix`.`tb_ingersos` (
  `idtb_ingersos` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL,
  `montoTotal` DECIMAL(10,2) NOT NULL,
  `tb_facturas_idtb_facturas` INT NOT NULL,
  PRIMARY KEY (`idtb_ingersos`),
  INDEX `fk_tb_ingersos_tb_facturas1_idx` (`tb_facturas_idtb_facturas` ASC) VISIBLE,
  CONSTRAINT `fk_tb_ingersos_tb_facturas1`
    FOREIGN KEY (`tb_facturas_idtb_facturas`)
    REFERENCES `clinix`.`tb_facturas` (`idtb_facturas`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `clinix`.`tb_personal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinix`.`tb_personal` (
  `idtb_personal` INT NOT NULL AUTO_INCREMENT,
  `cargo` VARCHAR(100) NOT NULL,
  `estado` BIT(1) NOT NULL,
  `tb_usuarios_idtb_usuarios` INT NOT NULL,
  `tb_usuarios_tb_persona_idtb_persona` INT NOT NULL,
  `tb_horarios_idtb_horarios` INT NOT NULL,
  PRIMARY KEY (`idtb_personal`, `tb_horarios_idtb_horarios`),
  INDEX `fk_tb_personal_tb_usuarios1_idx` (`tb_usuarios_idtb_usuarios` ASC, `tb_usuarios_tb_persona_idtb_persona` ASC) VISIBLE,
  INDEX `fk_tb_personal_tb_horarios1_idx` (`tb_horarios_idtb_horarios` ASC) VISIBLE,
  CONSTRAINT `fk_tb_personal_tb_horarios1`
    FOREIGN KEY (`tb_horarios_idtb_horarios`)
    REFERENCES `clinix`.`tb_horarios` (`idtb_horarios`),
  CONSTRAINT `fk_tb_personal_tb_usuarios1`
    FOREIGN KEY (`tb_usuarios_idtb_usuarios` , `tb_usuarios_tb_persona_idtb_persona`)
    REFERENCES `clinix`.`tb_usuarios` (`idtb_usuarios` , `tb_persona_idtb_persona`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


