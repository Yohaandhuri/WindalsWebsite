-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2024 at 12:41 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `windals`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee_master`
--

CREATE TABLE `employee_master` (
  `employee_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `joining_date` datetime NOT NULL,
  `leaving_date` datetime DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `mobile_no` varchar(100) DEFAULT NULL,
  `nick_name` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `access_given` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_master`
--

INSERT INTO `employee_master` (`employee_id`, `first_name`, `last_name`, `designation`, `joining_date`, `leaving_date`, `password`, `mobile_no`, `nick_name`, `user_name`, `access_given`) VALUES
(1, 'shailesh', 'thaware', 'asst prof', '0000-00-00 00:00:00', NULL, '$2b$10$H8ChHFZOfeeH0VCUjUNdMOBd/cL50I.4NI2VeF0SFuDin9dxvnv/a', NULL, '', 'admin', '111111111111111111111111111111111111'),
(8, 'Balaji', 'Ajab', 'IT Admin', '2017-09-01 00:00:00', NULL, '$2b$10$nEIqSSt8uFAvuroWzX.GfOnRf9O0y4ZWEEeDzQ5aoGyG2YJ6N4j9i', '8669674405', 'balaji', 'balaji_461', '100010001000001000'),
(9, 'yogesh', 'bangale', 'consultant', '2024-01-07 05:30:00', NULL, '$2b$10$iYPg7eXhVJJqhA.3elzfuum/NEJkjq7SvaZ/wXS0esEK3E/WMHQv2', '8378996046', 'yogesh', 'yogesh_npd', '11111111111111111111'),
(10, 'saurabh', 'bhole', 'engineer', '2024-01-08 00:00:00', NULL, '$2b$10$WVheEhA8vYnY3EkMmgnh7epmV4VGheCbK6JsF6btCOKxFENtQaICu', '9763009988', 'saurabh', 'saurabh_17', '010001000100000100'),
(11, 'w1', 'w1', 'w', '2024-01-08 00:00:00', NULL, '$2b$10$g6mvpY0LoPS0MJXqGx56H.d8FSquzGeY57BJ4Rs1jNiHGWUgUGPx2', '1111111111', 'w1', 'w1', '000000000000000000'),
(12, 'w2', 'w2', 'w', '2024-01-08 00:00:00', NULL, '$2b$10$AUS0ogq1bxYwIQrzfZnmXuFHVGDwSM87huVFouVpCuxQoyZE733uu', '2222222222', 'w2', 'w2', '00000000'),
(13, 'w3', 'w3', 'w', '2024-01-08 00:00:00', NULL, '$2b$10$/raPj66sQtmcFwgACwdyhegEWXXPk5F8wsjHYu5qNU3hbeBh8.gku', '3333333333', 'w3', 'w3', '00000000'),
(14, 'w4', 'w4', 'w4', '2024-01-10 00:00:00', NULL, '$2b$10$9i6CE6FbRfttvISDd4oS7epp4K.0Fp7wj3MxauFmR5AV38E7sQVXu', '1212121212', 'w4', 'w4', '000000000000000000'),
(15, 'w5', 'w5', 'w5', '2024-01-10 00:00:00', NULL, '$2b$10$Z8uRevZETtnzz44YhrJVPOa2Mpt1MohNu/aNcjdnKUPzxZTLMiyka', '2121212121', 'w5', 'w5', '00000000'),
(16, 'w6', 'w6', 'w6', '2024-01-10 00:00:00', NULL, '$2b$10$RmbCFC4tl5p8Gqei9AKioON2xO7hmzIrz.6uO0.jhnNml5d/wEM8C', '2323232323', 'w6', 'w6', '00000000'),
(17, 'w7', 'w7', 'w7', '2024-01-10 00:00:00', NULL, '$2b$10$PjODRjGZVHwFwX3M/2vU5ebzz8KthkbFOmREnHLAjs.R8RtT1nwli', '4545454545', 'w7', 'w7', '00000000'),
(18, 'w8', 'w8', 'w8', '2024-01-10 00:00:00', NULL, '$2b$10$rUiAJCkPYNgMIqfyGHYoguYrzC.unvI90i8Bd5bVUxLIRq2QmG7Lq', '6565656565', 'w8', 'w8', '00000000'),
(19, 's1', 's1', 's1', '2024-01-10 00:00:00', NULL, '$2b$10$xT9KJPQqfM9k6zQy4qNM1u9Hmb.MN0zte96WaoILOdg1GYdGGmXO6', '6767676767', 's1', 's1', '0000000000000000001'),
(20, 'w9', 'w9', 'w9', '2024-01-10 00:00:00', NULL, '$2b$10$nR1ijmNMF0QW/8Vnm0hVmeVmUkSrq.J3atluMqMmrXzzej4Nes9TG', '7878787878', 'w9', 'w9', '000000000000000000'),
(21, 'w10', 'w10', 'w10', '2024-01-10 00:00:00', NULL, '$2b$10$ryl2ryA/mv6h2AfE0Xo7yeiT8WQhOtGLFQYZpwYHpGtp4Wd5AByIG', '5433455431', 'w10', 'w10', '00000000');

-- --------------------------------------------------------

--
-- Table structure for table `login_log`
--

CREATE TABLE `login_log` (
  `employee_id` int(11) NOT NULL,
  `login` datetime NOT NULL,
  `logout` datetime DEFAULT NULL,
  `station_name` varchar(100) DEFAULT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_log`
--

INSERT INTO `login_log` (`employee_id`, `login`, `logout`, `station_name`, `address`) VALUES
(1, '2024-01-08 11:48:36', '2024-01-10 17:04:46', NULL, '::ffff:192.168.0.40'),
(1, '2024-01-08 11:53:27', '2024-01-10 17:04:46', NULL, '::ffff:192.168.0.40'),
(1, '2024-01-08 11:57:30', '2024-01-10 17:04:46', NULL, '::ffff:192.168.0.40'),
(1, '2024-01-08 12:22:32', '2024-01-10 17:04:46', NULL, '::ffff:192.168.0.162'),
(1, '2024-01-08 12:44:40', '2024-01-10 17:04:46', NULL, '::ffff:192.168.0.162'),
(8, '2024-01-08 12:48:34', '2024-01-10 16:07:06', NULL, '::ffff:192.168.0.162'),
(8, '2024-01-08 12:49:15', '2024-01-10 16:07:06', NULL, '::ffff:192.168.0.162'),
(1, '2024-01-08 13:53:43', '2024-01-10 17:04:46', NULL, '::ffff:192.168.0.162'),
(1, '2024-01-08 14:28:04', '2024-01-10 17:04:46', NULL, '::ffff:192.168.0.162'),
(1, '2024-01-08 14:32:38', '2024-01-10 17:04:46', NULL, '::ffff:192.168.0.162'),
(9, '2024-01-08 14:33:45', '2024-01-10 15:38:42', NULL, '::ffff:192.168.0.162'),
(10, '2024-01-08 14:35:24', '2024-01-08 14:35:54', NULL, '::ffff:192.168.0.162'),
(9, '2024-01-08 14:36:05', '2024-01-10 15:38:42', NULL, '::ffff:192.168.0.162'),
(8, '2024-01-08 14:36:31', '2024-01-10 16:07:06', NULL, '::ffff:192.168.0.185'),
(8, '2024-01-08 15:10:34', '2024-01-10 16:07:06', NULL, '::ffff:192.168.0.185'),
(9, '2024-01-08 15:25:57', '2024-01-10 15:38:42', NULL, '::ffff:192.168.0.162'),
(9, '2024-01-08 15:51:32', '2024-01-10 15:38:42', NULL, '::ffff:192.168.0.162'),
(11, '2024-01-08 15:59:15', '2024-01-10 11:57:07', NULL, '::ffff:192.168.0.162'),
(12, '2024-01-08 15:59:47', '2024-01-10 17:08:45', NULL, '::ffff:192.168.0.162'),
(9, '2024-01-08 16:00:46', '2024-01-10 15:38:42', NULL, '::ffff:192.168.0.162'),
(9, '2024-01-08 16:02:18', '2024-01-10 15:38:42', NULL, '::ffff:192.168.0.162'),
(11, '2024-01-08 16:07:27', '2024-01-10 11:57:07', NULL, '::ffff:192.168.0.162'),
(11, '2024-01-08 16:15:54', '2024-01-10 11:57:07', NULL, '::ffff:192.168.0.162'),
(9, '2024-01-08 16:23:36', '2024-01-10 15:38:42', NULL, '::ffff:192.168.0.162'),
(11, '2024-01-08 16:24:05', '2024-01-10 11:57:07', NULL, '::ffff:192.168.0.162'),
(12, '2024-01-08 16:24:22', '2024-01-10 17:08:45', NULL, '::ffff:192.168.0.162'),
(11, '2024-01-08 16:24:30', '2024-01-10 11:57:07', NULL, '::ffff:192.168.0.162'),
(9, '2024-01-08 16:25:06', '2024-01-10 15:38:42', NULL, '::ffff:192.168.0.162'),
(11, '2024-01-08 16:25:53', '2024-01-10 11:57:07', NULL, '::ffff:192.168.0.162'),
(11, '2024-01-08 16:26:44', '2024-01-10 11:57:07', NULL, '::ffff:192.168.0.162'),
(1, '2024-01-10 10:47:00', '2024-01-10 17:04:46', NULL, '::ffff:127.0.0.1'),
(11, '2024-01-10 10:56:10', '2024-01-10 11:57:07', NULL, '::ffff:127.0.0.1'),
(12, '2024-01-10 10:58:19', '2024-01-10 17:08:45', NULL, '::ffff:127.0.0.1'),
(1, '2024-01-10 10:58:33', '2024-01-10 17:04:46', NULL, '::ffff:127.0.0.1'),
(13, '2024-01-10 10:59:00', '2024-01-10 17:11:31', NULL, '::ffff:127.0.0.1'),
(1, '2024-01-10 11:00:13', '2024-01-10 17:04:46', NULL, '::ffff:127.0.0.1'),
(11, '2024-01-10 11:27:18', '2024-01-10 11:57:07', NULL, '::ffff:127.0.0.1'),
(12, '2024-01-10 11:28:37', '2024-01-10 17:08:45', NULL, '::ffff:127.0.0.1'),
(13, '2024-01-10 11:30:16', '2024-01-10 17:11:31', NULL, '::ffff:127.0.0.1'),
(14, '2024-01-10 11:31:31', '2024-01-10 12:04:36', NULL, '::ffff:127.0.0.1'),
(1, '2024-01-10 11:31:55', '2024-01-10 17:04:46', NULL, '::ffff:127.0.0.1'),
(19, '2024-01-10 11:32:56', '2024-01-10 17:09:21', NULL, '::ffff:127.0.0.1'),
(12, '2024-01-10 11:35:04', '2024-01-10 17:08:45', NULL, '::ffff:127.0.0.1'),
(13, '2024-01-10 11:36:43', '2024-01-10 17:11:31', NULL, '::ffff:127.0.0.1'),
(1, '2024-01-10 11:36:57', '2024-01-10 17:04:46', NULL, '::ffff:127.0.0.1'),
(11, '2024-01-10 11:56:22', '2024-01-10 11:57:07', NULL, '::ffff:127.0.0.1'),
(12, '2024-01-10 11:57:12', '2024-01-10 17:08:45', NULL, '::ffff:127.0.0.1'),
(13, '2024-01-10 11:57:28', '2024-01-10 17:11:31', NULL, '::ffff:127.0.0.1'),
(1, '2024-01-10 11:58:23', '2024-01-10 17:04:46', NULL, '::ffff:127.0.0.1'),
(12, '2024-01-10 12:02:55', '2024-01-10 17:08:45', NULL, '::ffff:127.0.0.1'),
(13, '2024-01-10 12:03:58', '2024-01-10 17:11:31', NULL, '::ffff:127.0.0.1'),
(14, '2024-01-10 12:04:22', '2024-01-10 12:04:36', NULL, '::ffff:127.0.0.1'),
(16, '2024-01-10 12:04:43', '2024-01-10 12:05:26', NULL, '::ffff:127.0.0.1'),
(15, '2024-01-10 12:04:56', '2024-01-10 12:05:08', NULL, '::ffff:127.0.0.1'),
(16, '2024-01-10 12:05:14', '2024-01-10 12:05:26', NULL, '::ffff:127.0.0.1'),
(17, '2024-01-10 12:05:31', '2024-01-10 12:05:43', NULL, '::ffff:127.0.0.1'),
(18, '2024-01-10 12:05:49', '2024-01-10 12:06:01', NULL, '::ffff:127.0.0.1'),
(20, '2024-01-10 12:06:07', '2024-01-10 12:06:26', NULL, '::ffff:127.0.0.1'),
(21, '2024-01-10 12:06:32', '2024-01-10 12:06:46', NULL, '::ffff:127.0.0.1'),
(1, '2024-01-10 12:06:47', '2024-01-10 17:04:46', NULL, '::ffff:127.0.0.1'),
(19, '2024-01-10 12:11:35', '2024-01-10 17:09:21', NULL, '::ffff:127.0.0.1'),
(1, '2024-01-10 12:15:16', '2024-01-10 17:04:46', NULL, '::ffff:127.0.0.1'),
(13, '2024-01-10 12:19:22', '2024-01-10 17:11:31', NULL, '::ffff:127.0.0.1'),
(1, '2024-01-10 12:20:27', '2024-01-10 17:04:46', NULL, '::ffff:127.0.0.1'),
(1, '2024-01-10 12:27:48', '2024-01-10 17:04:46', NULL, '::ffff:127.0.0.1'),
(1, '2024-01-10 13:08:50', '2024-01-10 17:04:46', NULL, '::ffff:127.0.0.1'),
(19, '2024-01-10 14:34:50', '2024-01-10 17:09:21', NULL, '::ffff:127.0.0.1'),
(19, '2024-01-10 14:36:14', '2024-01-10 17:09:21', NULL, '::ffff:127.0.0.1'),
(1, '2024-01-10 14:53:19', '2024-01-10 17:04:46', NULL, '::ffff:127.0.0.1'),
(9, '2024-01-10 15:33:37', '2024-01-10 15:38:42', NULL, '::ffff:192.168.0.162'),
(8, '2024-01-10 15:33:52', '2024-01-10 16:07:06', NULL, '::ffff:192.168.0.196'),
(9, '2024-01-10 15:38:36', '2024-01-10 15:38:42', NULL, '::ffff:192.168.0.162'),
(8, '2024-01-10 16:03:30', '2024-01-10 16:07:06', NULL, '::ffff:192.168.0.185'),
(1, '2024-01-10 16:56:32', '2024-01-10 17:04:46', NULL, '::ffff:192.168.0.162'),
(1, '2024-01-10 17:02:21', '2024-01-10 17:04:46', NULL, '::ffff:192.168.0.162'),
(19, '2024-01-10 17:04:53', '2024-01-10 17:09:21', NULL, '::ffff:192.168.0.162'),
(12, '2024-01-10 17:05:59', '2024-01-10 17:08:45', NULL, '::ffff:192.168.0.162'),
(19, '2024-01-10 17:06:57', '2024-01-10 17:09:21', NULL, '::ffff:192.168.0.162'),
(12, '2024-01-10 17:07:11', '2024-01-10 17:08:45', NULL, '::ffff:192.168.0.162'),
(13, '2024-01-10 17:08:50', '2024-01-10 17:11:31', NULL, '::ffff:192.168.0.162'),
(19, '2024-01-10 17:09:06', '2024-01-10 17:09:21', NULL, '::ffff:192.168.0.162'),
(13, '2024-01-10 17:09:26', '2024-01-10 17:11:31', NULL, '::ffff:192.168.0.162');

-- --------------------------------------------------------

--
-- Table structure for table `machine_master`
--

CREATE TABLE `machine_master` (
  `machine_id` smallint(5) UNSIGNED NOT NULL,
  `station_id` int(11) UNSIGNED NOT NULL,
  `machine_name` varchar(100) NOT NULL,
  `cycle_time` smallint(5) UNSIGNED NOT NULL,
  `daily_count` smallint(5) UNSIGNED NOT NULL,
  `product_per_hour` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productyyyy`
--

CREATE TABLE `productyyyy` (
  `job_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `station_id` int(11) NOT NULL,
  `job_name` varchar(100) NOT NULL,
  `machine_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productyyyy`
--

INSERT INTO `productyyyy` (`job_id`, `product_name`, `station_id`, `job_name`, `machine_id`) VALUES
(1, '60S', 56, 'Q11', 0),
(2, '60S', 56, 'Q12', 0),
(3, '60S', 56, 'Q13', 0),
(4, '60S', 56, 'JK029', 0),
(5, '60S', 56, 'JK030', 0),
(6, '60S', 56, 'JK031', 0),
(7, '60S', 56, 'JK032', 0),
(8, '60S', 56, 'JK033', 0),
(9, '90s', 66, 'ab121', 0),
(10, '90s', 66, 'ab122', 0),
(11, '90s', 66, 'ab123', 0),
(12, '90s', 66, 'ab124', 0),
(13, '90s', 66, 'ab125', 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_master`
--

CREATE TABLE `product_master` (
  `id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `parameter` varchar(100) DEFAULT NULL,
  `min_parameter` float DEFAULT NULL,
  `max_parameter` float DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `evaluation` varchar(50) NOT NULL,
  `sample_size` int(11) NOT NULL,
  `value_oknotok` tinyint(1) NOT NULL,
  `compulsory` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_master`
--

INSERT INTO `product_master` (`id`, `product_name`, `parameter`, `min_parameter`, `max_parameter`, `unit`, `evaluation`, `sample_size`, `value_oknotok`, `compulsory`) VALUES
(9, '60S', 'totallength', 1569, 1571, 'mm', 'varier calliper/tape', 10, 1, 1),
(10, '60S', 'DrainandBreether', 11.68, 11.7, 'mm', 'go/no go', 100, 0, 1),
(11, '90s', 'totalLength', 100, 1000, 'kilo', '1', 10, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `shift_config`
--

CREATE TABLE `shift_config` (
  `shift_id` smallint(5) UNSIGNED NOT NULL,
  `shift_name` varchar(100) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shift_config`
--

INSERT INTO `shift_config` (`shift_id`, `shift_name`, `start_time`, `end_time`, `active`) VALUES
(4, 'First', '07:00:00', '15:00:00', 1),
(5, 'Second', '15:00:00', '23:00:00', 1),
(6, 'Third', '23:00:00', '07:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `station_allocation`
--

CREATE TABLE `station_allocation` (
  `employee_id` int(11) NOT NULL,
  `stationId` int(11) NOT NULL,
  `station_name` varchar(100) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `shift_Id` smallint(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `station_allocation`
--

INSERT INTO `station_allocation` (`employee_id`, `stationId`, `station_name`, `fromDate`, `toDate`, `shift_Id`) VALUES
(11, 56, 'TotalLength', '2024-01-08', '0000-00-00', 4),
(11, 56, 'TotalLength', '2024-01-08', '0000-00-00', 5),
(11, 66, 'TotalLength', '2024-01-10', '0000-00-00', 4),
(12, 57, 'DrainandBreether', '2024-01-08', '2024-01-08', 4),
(12, 57, 'DrainandBreether', '2024-01-08', '0000-00-00', 5),
(12, 57, 'DrainandBreether', '2024-01-10', '0000-00-00', 4),
(12, 67, 'DrainandBreether', '2024-01-10', '0000-00-00', 4),
(13, 57, 'DrainandBreether', '2024-01-08', '2024-01-10', 4),
(13, 60, 'CoverTackWelding', '2024-01-10', '0000-00-00', 4),
(13, 60, 'CoverTackWelding', '2024-01-10', '0000-00-00', 5),
(13, 68, 'FlangeTackWelding', '2024-01-10', '2024-01-10', 4),
(13, 70, 'CoverTackWelding', '2024-01-10', '0000-00-00', 4),
(14, 61, 'CoverFullWelding', '2024-01-10', '0000-00-00', 4),
(14, 61, 'CoverFullWelding', '2024-01-10', '0000-00-00', 5),
(14, 69, 'FrictionWelding', '2024-01-10', '2024-01-10', 4),
(14, 71, 'CoverFullWelding', '2024-01-10', '0000-00-00', 4),
(15, 62, 'FrictionWelding', '2024-01-10', '0000-00-00', 4),
(15, 62, 'FrictionWelding', '2024-01-10', '0000-00-00', 5),
(15, 69, 'FrictionWelding', '2024-01-10', '0000-00-00', 4),
(15, 70, 'CoverTackWelding', '2024-01-10', '2024-01-10', 4),
(16, 63, 'FlangeTackWelding', '2024-01-10', '0000-00-00', 4),
(16, 63, 'FlangeTackWelding', '2024-01-10', '0000-00-00', 5),
(16, 68, 'FlangeTackWelding', '2024-01-10', '0000-00-00', 4),
(16, 71, 'CoverFullWelding', '2024-01-10', '2024-01-10', 4),
(17, 64, 'FlangeFullWelding', '2024-01-10', '0000-00-00', 4),
(17, 64, 'FlangeFullWelding', '2024-01-10', '0000-00-00', 5),
(17, 72, 'FlangeFullWelding', '2024-01-10', '0000-00-00', 4),
(18, 65, 'Straightening', '2024-01-10', '0000-00-00', 4),
(18, 65, 'Straightening', '2024-01-10', '0000-00-00', 5),
(18, 73, 'Straightening', '2024-01-10', '0000-00-00', 4),
(20, 74, 'Turning', '2024-01-10', '0000-00-00', 4),
(21, 75, 'Grinding', '2024-01-10', '0000-00-00', 4);

-- --------------------------------------------------------

--
-- Table structure for table `station_master`
--

CREATE TABLE `station_master` (
  `station_id` int(11) UNSIGNED NOT NULL,
  `station_name` varchar(100) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `report` int(11) NOT NULL,
  `station_parameters` varchar(1000) DEFAULT NULL,
  `next_station_name` varchar(100) DEFAULT NULL,
  `cycle_time` smallint(5) UNSIGNED NOT NULL,
  `daily_count` smallint(5) UNSIGNED NOT NULL,
  `product_per_hour` smallint(5) UNSIGNED NOT NULL,
  `multiple_machine` tinyint(1) NOT NULL,
  `process_number` smallint(5) UNSIGNED NOT NULL,
  `position` tinyint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `station_master`
--

INSERT INTO `station_master` (`station_id`, `station_name`, `product_name`, `report`, `station_parameters`, `next_station_name`, `cycle_time`, `daily_count`, `product_per_hour`, `multiple_machine`, `process_number`, `position`) VALUES
(56, 'TotalLength', '60S', 1, 'totallength', 'DrainandBreether', 20, 10, 10, 0, 1, 1),
(57, 'DrainandBreether', '60S', 1, 'DrainandBreether', 'CoverTackWelding', 20, 20, 20, 0, 2, 0),
(60, 'CoverTackWelding', '60S', 0, NULL, 'CoverFullWelding', 10, 20, 30, 0, 3, 0),
(61, 'CoverFullWelding', '60S', 0, NULL, 'FrictionWelding', 10, 10, 10, 0, 4, 0),
(62, 'FrictionWelding', '60S', 0, NULL, 'FlangeTackWelding', 10, 10, 10, 0, 6, 0),
(63, 'FlangeTackWelding', '60S', 0, NULL, 'FlangeFullWelding', 10, 10, 10, 0, 7, 0),
(64, 'FlangeFullWelding', '60S', 0, NULL, 'Straightening', 10, 10, 10, 0, 8, 0),
(65, 'Straightening', '60S', 0, NULL, NULL, 10, 10, 10, 0, 9, -1),
(66, 'TotalLength', '90s', 1, 'totallength', 'DrainandBreether', 10, 10, 10, 0, 1, 1),
(67, 'DrainandBreether', '90s', 1, 'DrainandBreether', 'CoverTackWelding', 20, 20, 20, 0, 2, 0),
(68, 'FlangeTackWelding', '90s', 0, NULL, 'FlangeFullWelding', 10, 10, 10, 0, 7, 0),
(69, 'FrictionWelding', '90s', 0, NULL, 'FlangeTackWelding', 10, 10, 10, 0, 6, 0),
(70, 'CoverTackWelding', '90s', 0, NULL, 'CoverFullWelding', 10, 20, 30, 0, 3, 0),
(71, 'CoverFullWelding', '90s', 0, NULL, 'FrictionWelding', 10, 10, 10, 0, 4, 0),
(72, 'FlangeFullWelding', '90s', 0, NULL, 'Straightening', 10, 10, 10, 0, 8, 0),
(73, 'Straightening', '90s', 0, NULL, 'Turning', 10, 10, 10, 0, 9, 0),
(74, 'Turning', '90s', 0, NULL, 'Grinding', 10, 10, 10, 0, 10, 0),
(75, 'Grinding', '90s', 0, NULL, NULL, 10, 10, 10, 0, 11, -1);

-- --------------------------------------------------------

--
-- Table structure for table `station_yyyy`
--

CREATE TABLE `station_yyyy` (
  `station_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `job_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `parameters` varchar(1000) DEFAULT NULL,
  `intime` datetime NOT NULL,
  `out_time` datetime DEFAULT NULL,
  `machine_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `station_yyyy`
--

INSERT INTO `station_yyyy` (`station_id`, `product_name`, `job_id`, `employee_id`, `status`, `parameters`, `intime`, `out_time`, `machine_id`) VALUES
(56, '60S', 1, 11, 1, NULL, '2024-01-10 10:57:44', '2024-01-10 10:57:44', 0),
(57, '60S', 1, 13, 1, 'Parameters:DrainandBreether,O', '2024-01-10 10:57:44', '2024-01-10 10:59:29', 0),
(56, '60S', 2, 11, 1, NULL, '2024-01-10 10:57:52', '2024-01-10 10:57:52', 0),
(57, '60S', 2, NULL, NULL, NULL, '2024-01-10 10:57:52', NULL, 0),
(56, '60S', 3, 11, 1, NULL, '2024-01-10 10:58:06', '2024-01-10 10:58:06', 0),
(57, '60S', 3, NULL, NULL, NULL, '2024-01-10 10:58:06', NULL, 0),
(56, '60S', 4, 11, 1, NULL, '2024-01-10 11:27:52', '2024-01-10 11:27:52', 0),
(57, '60S', 4, 12, 1, 'Parameters:DrainandBreether,O', '2024-01-10 11:27:52', '2024-01-10 11:29:13', 0),
(56, '60S', 5, 11, 1, NULL, '2024-01-10 11:28:03', '2024-01-10 11:28:03', 0),
(57, '60S', 5, 12, 1, 'Parameters:DrainandBreether,O', '2024-01-10 11:28:03', '2024-01-10 11:29:18', 0),
(56, '60S', 6, 11, 1, NULL, '2024-01-10 11:28:08', '2024-01-10 11:28:08', 0),
(57, '60S', 6, 12, -3, 'Not-Okay-Reason:operstion missing;Parameters:DrainandBreether,N', '2024-01-10 11:28:08', '2024-01-10 11:34:47', 0),
(56, '60S', 7, 11, 1, NULL, '2024-01-10 11:28:15', '2024-01-10 11:28:15', 0),
(57, '60S', 7, NULL, NULL, NULL, '2024-01-10 11:28:15', NULL, 0),
(56, '60S', 8, 11, 1, NULL, '2024-01-10 11:28:20', '2024-01-10 11:28:20', 0),
(57, '60S', 8, NULL, NULL, NULL, '2024-01-10 11:28:20', NULL, 0),
(60, '60S', 4, NULL, NULL, NULL, '2024-01-10 11:29:13', NULL, 0),
(60, '60S', 5, 13, 1, NULL, '2024-01-10 11:29:18', '2024-01-10 11:31:18', 0),
(61, '60S', 5, NULL, NULL, NULL, '2024-01-10 11:31:18', NULL, 0),
(57, '60S', 6, 12, 1, 'Parameters:DrainandBreether,O', '2024-01-10 11:34:47', '2024-01-10 11:36:27', 0),
(60, '60S', 6, NULL, NULL, NULL, '2024-01-10 11:36:27', NULL, 0),
(66, '90s', 9, 11, 1, NULL, '2024-01-10 11:56:47', '2024-01-10 11:56:47', 0),
(67, '90s', 9, 12, 1, 'Parameters:DrainandBreether,', '2024-01-10 11:56:47', '2024-01-10 12:03:26', 0),
(66, '90s', 10, 11, 1, NULL, '2024-01-10 11:56:50', '2024-01-10 11:56:50', 0),
(67, '90s', 10, 12, 1, 'Parameters:DrainandBreether,', '2024-01-10 11:56:50', '2024-01-10 12:03:28', 0),
(66, '90s', 11, 11, 1, NULL, '2024-01-10 11:56:54', '2024-01-10 11:56:54', 0),
(67, '90s', 11, 12, -3, 'Not-Okay-Reason:not ok;Parameters:DrainandBreether,', '2024-01-10 11:56:54', '2024-01-10 17:07:04', 0),
(66, '90s', 12, 11, 1, NULL, '2024-01-10 11:56:57', '2024-01-10 11:56:57', 0),
(67, '90s', 12, 12, 2, 'Not-Okay-Reason:testing;Parameters:DrainandBreether,', '2024-01-10 11:56:57', '2024-01-10 17:09:19', 0),
(66, '90s', 13, 11, 1, NULL, '2024-01-10 11:57:02', '2024-01-10 11:57:02', 0),
(67, '90s', 13, NULL, NULL, NULL, '2024-01-10 11:57:02', NULL, 0),
(70, '90s', 9, 13, 1, NULL, '2024-01-10 12:03:26', '2024-01-10 12:04:10', 0),
(70, '90s', 10, 13, 1, NULL, '2024-01-10 12:03:28', '2024-01-10 12:04:13', 0),
(71, '90s', 9, 14, 1, NULL, '2024-01-10 12:04:10', '2024-01-10 12:04:31', 0),
(71, '90s', 10, 14, 1, NULL, '2024-01-10 12:04:13', '2024-01-10 12:04:33', 0),
(69, '90s', 9, 15, 1, NULL, '2024-01-10 12:04:31', '2024-01-10 12:05:04', 0),
(69, '90s', 10, 15, 1, NULL, '2024-01-10 12:04:33', '2024-01-10 12:05:06', 0),
(68, '90s', 9, 16, 1, NULL, '2024-01-10 12:05:04', '2024-01-10 12:05:22', 0),
(68, '90s', 10, 16, 1, NULL, '2024-01-10 12:05:06', '2024-01-10 12:05:24', 0),
(72, '90s', 9, 17, 1, NULL, '2024-01-10 12:05:22', '2024-01-10 12:05:40', 0),
(72, '90s', 10, 17, 1, NULL, '2024-01-10 12:05:24', '2024-01-10 12:05:41', 0),
(73, '90s', 9, 18, 1, NULL, '2024-01-10 12:05:40', '2024-01-10 12:05:58', 0),
(73, '90s', 10, 18, 1, NULL, '2024-01-10 12:05:41', '2024-01-10 12:05:59', 0),
(74, '90s', 9, 20, 1, NULL, '2024-01-10 12:05:58', '2024-01-10 12:06:22', 0),
(74, '90s', 10, 20, 1, NULL, '2024-01-10 12:05:59', '2024-01-10 12:06:24', 0),
(75, '90s', 9, 21, 1, NULL, '2024-01-10 12:06:22', '2024-01-10 12:06:41', 0),
(75, '90s', 10, 21, 1, NULL, '2024-01-10 12:06:24', '2024-01-10 12:06:43', 0),
(67, '90s', 11, NULL, NULL, NULL, '2024-01-10 17:07:04', NULL, 0),
(70, '90s', 12, NULL, NULL, NULL, '2024-01-10 17:09:19', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee_master`
--
ALTER TABLE `employee_master`
  ADD PRIMARY KEY (`employee_id`),
  ADD UNIQUE KEY `employee_id_UNIQUE` (`employee_id`),
  ADD UNIQUE KEY `user_name_UNIQUE` (`user_name`);

--
-- Indexes for table `login_log`
--
ALTER TABLE `login_log`
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `machine_master`
--
ALTER TABLE `machine_master`
  ADD PRIMARY KEY (`machine_id`);

--
-- Indexes for table `productyyyy`
--
ALTER TABLE `productyyyy`
  ADD PRIMARY KEY (`job_id`);

--
-- Indexes for table `product_master`
--
ALTER TABLE `product_master`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `shift_config`
--
ALTER TABLE `shift_config`
  ADD PRIMARY KEY (`shift_id`),
  ADD UNIQUE KEY `shift_name_UNIQUE` (`shift_name`);

--
-- Indexes for table `station_allocation`
--
ALTER TABLE `station_allocation`
  ADD PRIMARY KEY (`employee_id`,`stationId`,`fromDate`,`shift_Id`);

--
-- Indexes for table `station_master`
--
ALTER TABLE `station_master`
  ADD PRIMARY KEY (`station_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee_master`
--
ALTER TABLE `employee_master`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `machine_master`
--
ALTER TABLE `machine_master`
  MODIFY `machine_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `productyyyy`
--
ALTER TABLE `productyyyy`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `product_master`
--
ALTER TABLE `product_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `shift_config`
--
ALTER TABLE `shift_config`
  MODIFY `shift_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `station_master`
--
ALTER TABLE `station_master`
  MODIFY `station_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `login_log`
--
ALTER TABLE `login_log`
  ADD CONSTRAINT `login_log_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee_master` (`employee_id`) ON DELETE CASCADE;

--
-- Constraints for table `station_allocation`
--
ALTER TABLE `station_allocation`
  ADD CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee_master` (`employee_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
