-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 16, 2014 at 02:47 AM
-- Server version: 5.5.38-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `puckno_tournament`
--

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `src` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `ithf_players`
--

CREATE TABLE IF NOT EXISTS `ithf_players` (
  `id` int(11) NOT NULL,
  `rank` int(11) NOT NULL,
  `player` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `club` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nation` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `points` int(11) NOT NULL,
  `best` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `player` (`player`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `local_players`
--

CREATE TABLE IF NOT EXISTS `local_players` (
  `id` int(11) NOT NULL,
  `player` varchar(255) NOT NULL,
  `club` varchar(255) NOT NULL,
  `nation` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `subtournaments`
--

CREATE TABLE IF NOT EXISTS `subtournaments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tournament_id` varchar(12) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tournaments`
--

CREATE TABLE IF NOT EXISTS `tournaments` (
  `id` varchar(12) NOT NULL,
  `name` varchar(255) NOT NULL,
  `language` varchar(8) NOT NULL,
  `date` date NOT NULL,
  `deadline` date NOT NULL,
  `fee` varchar(255) NOT NULL,
  `venue` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `misc` text NOT NULL,
  `program` text NOT NULL,
  `details` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
