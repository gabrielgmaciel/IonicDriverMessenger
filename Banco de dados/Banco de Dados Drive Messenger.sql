drop database gnove;

create database gnove charset = UTF8 COLLATE = utf8_general_ci;

use gnove;

create table Usuario(
  cod_usuario INTEGER NOT NULL AUTO_INCREMENT,
  nome varchar(70) not null,
  email varchar(60) not null,
  senha varchar(255)not null,
  primary key(cod_usuario)
);

create table Dados_veiculo(
  cod_usuario INTEGER NOT NULL,
  tipo_veiculo VARCHAR(10) not null,
  placa varchar(8) not null,
  modelo varchar(60) not null,
  primary key (placa),
  foreign key (cod_usuario) references Usuario (cod_usuario) on delete cascade on update cascade
);

create table Mensagem(
  cod_mensagem INTEGER not null auto_increment,
  mensagem varchar(150),
  primary key (cod_mensagem)
);

create table Mensagem_usuario(
  cod_usuario INTEGER NOT NULL,
  placa varchar (60) not null,
  cod_mensagem_recebida INTEGER not null auto_increment,
  mensagem VARCHAR(60) not null,
  tempo timestamp default current_timestamp(),
  status int not null,
  primary key (cod_mensagem_recebida),
  foreign key (cod_usuario) references Usuario (cod_usuario) on delete cascade on update cascade,
  foreign key (placa) references Dados_veiculo (placa) on delete cascade on update cascade
);

create table Telefone(
cod_telefone integer not null auto_increment,
telefone varchar(15) not null,
cod_usuario integer,
primary key (cod_telefone),
foreign key (cod_usuario) references Usuario (cod_usuario) on delete cascade on update cascade
);

CREATE TABLE Loja(
  cod_loja INTEGER NOT NULL AUTO_INCREMENT,
  CNPJ VARCHAR(50) NOT NULL,
  razaoSocial VARCHAR(255),
  nome_loja VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  logradouro_loja VARCHAR(255) NOT NULL,
  telefone_loja VARCHAR(50) NOT NULL,
  nome_imagem varchar(25),
  tamanho_imagem varchar(25),
  tipo_imagem varchar(25),
  PRIMARY KEY (cod_loja)
);

create table Categoria(
cod_categoria integer not null auto_increment,
nome varchar(255),
primary key (cod_categoria)
);

create table Marca(
cod_marca integer not null auto_increment,
nome varchar(255),
primary key (cod_marca)
);

CREATE TABLE Produto(
  cod_produto INTEGER AUTO_INCREMENT NOT NULL,
  cod_loja INTEGER NOT NULL,
  link LONGTEXT,
  nome_imagem varchar(25),
  tamanho_imagem varchar(25),
  tipo_imagem varchar(25),
  nome_produto VARCHAR(255) NOT NULL,
  preco_produto double(8,2) NOT NULL,
  cod_categoria integer not null,
  cod_marca integer not null,
  descricao_produto LONGTEXT NOT NULL,
  PRIMARY KEY (cod_produto),
  FOREIGN KEY (cod_loja) REFERENCES Loja (cod_loja) on delete cascade on update cascade,
  foreign key (cod_categoria) references Categoria (cod_categoria),
  foreign key (cod_marca) references Marca (cod_marca)
);

INSERT Marca (cod_marca, nome) VALUES
  (1, "Volkswagen"),
  (2, "Chevrolet"),
  (3, "Fiat"),
  (4, "Ford"),
  (5, "Hyundai"),
  (6, "Toyota"),
  (7, "Honda"),
  (8, "Citroen");

INSERT Categoria (cod_categoria, nome) VALUES
  (1, "Parachoque"),
  (2, "Pneu"),
  (3, "Farol"),
  (4, "Volante"),
  (5, "Lanterna");