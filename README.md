# minefield
Jogo Campo Minado desenvolvido como trabalho para a disciplina Programação Web na Universidade Estadual de Campinas (Unicamp)


CREATE DATABASE CampoMinado;
USE CampoMinado; 

-- Usuario
CREATE TABLE Usuario (
    username VARCHAR(20) PRIMARY KEY,
    cpf CHAR(11) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    dataNasc DATE NOT NULL,
    telefone VARCHAR(15),
    email VARCHAR(30) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL
);

-- Partida
CREATE TABLE Partida (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jogador_username VARCHAR(20) NOT NULL,
    modalidade VARCHAR(10) NOT NULL,
    tamTabuleiro INT NOT NULL,
    numBombas INT NOT NULL,
    resultado VARCHAR(10),
    dataPartida DATE NOT NULL,
    tempoPartida INT NOT NULL,
    CONSTRAINT FK_Jogador 
    	FOREIGN KEY (jogador_username) 
    	REFERENCES Usuario(username)
    
);


INSERT INTO usuario VALUES ('Enzo', '41268848077', 'Enzola', '2024-11-18', '19994214649', 'enzoarilla8@gmail.com', '1234');
INSERT INTO usuario VALUES ('chika', '94016720087', 'Francisca', '2024-07-01', '19985456332', 'f.rosa96@hotmail.com', '1234');
INSERT INTO usuario VALUES ('pietra', '7794391090', 'Pietra da Silva', '2024-08-01', '1998545685', 'pipi@hotmail.com', '1234');
INSERT INTO usuario VALUES ('ste', '69701808088', 'Stephani Gentil', '2024-08-12', '1998785685', 'ste@hotmail.com', '1234');


INSERT INTO Partida VALUES (1, 'ste', 'RIVOTRIL', 30, 15, 'VITORIA', '2024-10-10', 200);
INSERT INTO Partida VALUES (2, 'chika', 'NORMAL', 100, 60, 'DERROTA', '2024-10-10', 100);
INSERT INTO Partida VALUES (3, 'chika', 'RANQUEADA', 50, 100, 'VITORIA', '2024-11-10', 150);
INSERT INTO Partida VALUES (4, 'Enzo', 'NORMAL', 100, 60, 'VITORIA', '2024-12-10', 100);





// verificar como penviar os dados para autoincremento de id de partida