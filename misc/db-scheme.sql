-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 24, 2015 at 12:07 PM
-- Server version: 5.5.41-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `puckno_tournament`
--
CREATE DATABASE IF NOT EXISTS `puckno_tournament` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `puckno_tournament`;

-- --------------------------------------------------------

--
-- Table structure for table `ithf_players`
--

CREATE TABLE IF NOT EXISTS `ithf_players` (
  `id` int(11) NOT NULL,
  `rank` int(11) NOT NULL,
  `player` varchar(255) CHARACTER SET utf8 NOT NULL,
  `club` varchar(255) CHARACTER SET utf8 NOT NULL,
  `nation` varchar(4) CHARACTER SET utf8 NOT NULL,
  `points` int(11) NOT NULL,
  `best` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `player` (`player`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `local_players`
--

CREATE TABLE IF NOT EXISTS `local_players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player` varchar(255) CHARACTER SET utf8 NOT NULL,
  `club` varchar(255) CHARACTER SET utf8 NOT NULL,
  `nation` varchar(3) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=13 ;

-- --------------------------------------------------------

--
-- Table structure for table `subtournaments`
--

CREATE TABLE IF NOT EXISTS `subtournaments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tournament_id` varchar(12) CHARACTER SET utf8 NOT NULL,
  `type` varchar(255) CHARACTER SET utf8 NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Table structure for table `subtournament_players`
--

CREATE TABLE IF NOT EXISTS `subtournament_players` (
  `subtournament_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `local_player_flag` tinyint(1) NOT NULL DEFAULT '0',
  `ithf_player_flag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`subtournament_id`,`player_id`,`local_player_flag`,`ithf_player_flag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

-- --
-- -- Table structure for table `team_players`
-- --

-- CREATE TABLE IF NOT EXISTS `team_players` (
--   `team_id` int(11) NOT NULL,
--   `player_id` int(11) NOT NULL,
--   `local_player_flag` tinyint(1) NOT NULL DEFAULT '0',
--   `ithf_player_flag` tinyint(1) NOT NULL DEFAULT '0',
--   PRIMARY KEY (`subtournament_id`,`player_id`,`local_player_flag`,`ithf_player_flag`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- -- --------------------------------------------------------

-- --
-- -- Table structure for table `team`
-- --

-- CREATE TABLE IF NOT EXISTS `team` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `subtournament_id` int(11) NOT NULL,
--   `name` varchar(255) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


-- --
-- -- Table structure for table `subtournament_teams`
-- --

-- CREATE TABLE IF NOT EXISTS `subtournament_teams` (
--   `subtournament_id` int(11) NOT NULL,
--   `team_id` int(11) NOT NULL,
--   PRIMARY KEY (`subtournament_id`,`team_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `subtournament_team3` (
  `subtournamentId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `player1` varchar(255) NOT NULL,
  `player2` varchar(255) NOT NULL,
  `player3` varchar(255) NOT NULL,
  PRIMARY KEY (`subtournamentId`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tournaments`
--

CREATE TABLE IF NOT EXISTS `tournaments` (
  `id` varchar(12) CHARACTER SET utf8 NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `language` varchar(8) CHARACTER SET utf8 NOT NULL,
  `date` date NOT NULL,
  `deadline` date NOT NULL,
  `fee` varchar(255) CHARACTER SET utf8 NOT NULL,
  `venue` varchar(255) CHARACTER SET utf8 NOT NULL,
  `contact` varchar(255) CHARACTER SET utf8 NOT NULL,
  `image` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `misc` text CHARACTER SET utf8 NOT NULL,
  `program` text CHARACTER SET utf8 NOT NULL,
  `details` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  KEY `date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tournament_logos`
--

CREATE TABLE IF NOT EXISTS `tournament_logos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `src` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;