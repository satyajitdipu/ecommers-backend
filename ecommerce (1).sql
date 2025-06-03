-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2025 at 07:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` varchar(100) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `variant` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `product_id`, `full_name`, `email`, `phone`, `address`, `city`, `state`, `zip`, `variant`, `quantity`, `total`, `status`, `created_at`) VALUES
('11eeb650-6b21-418b-9887-6602aedb264c', 5, 'SATYAJIT SAHOO', 'satyajit+107@remotespeech.com', '6372754900', 'dfwfrwf', 'aaxs', 'Odisha', '123456', NULL, 1, 89.99, 'approved', '2025-06-01 18:18:30'),
('18d14057-56cd-49d6-8c89-43a179bbabd2', 1, 'John Doe', 'john@example.com', '9876543210', '123 Street', 'Mumbai', 'Maharashtra', '400001', 'Red / XL', 2, 159.98, 'pending', '2025-06-01 15:56:14'),
('2cfbc57a-d211-4107-b38e-49dd1fedd320', 1, 'John Doe', 'john@example.com', '9876543210', '123 Street', 'Mumbai', 'Maharashtra', '400001', 'Red / XL', 2, 159.98, 'approved', '2025-06-01 17:42:32'),
('2d23093b-5e02-4f0a-8945-15a4a8c9f503', 1, 'John Doe', 'john@example.com', '9876543210', '123 Street', 'Mumbai', 'Maharashtra', '400001', 'Red / XL', 2, 159.98, 'pending', '2025-06-01 15:58:52'),
('429a6901-1c4d-4680-b8b8-0daca4e14d76', 1, 'John Doe', 'john@example.com', '9876543210', '123 Street', 'Mumbai', 'Maharashtra', '400001', 'Red / XL', 2, 159.98, 'approved', '2025-06-01 17:41:47'),
('45b87724-264b-4148-b51a-479c42a7229a', 1, 'John Doe', 'john@example.com', '9876543210', '123 Street', 'Mumbai', 'Maharashtra', '400001', 'Red / XL', 2, 159.98, 'approved', '2025-06-01 15:05:16'),
('47cf8b8e-68e5-443d-a77c-5234907ac725', 1, 'John Doe', 'john@example.com', '9876543210', '123 Street', 'Mumbai', 'Maharashtra', '400001', 'Red / XL', 2, 159.98, 'approved', '2025-06-01 18:01:25'),
('5dccff56-0204-4007-967f-43fbe096f220', 1, 'John Doe', 'john@example.com', '9876543210', '123 Street', 'Mumbai', 'Maharashtra', '400001', 'Red / XL', 2, 159.98, 'approved', '2025-06-01 16:01:49'),
('6dfb42ea-69b2-4082-90e5-9f613405c925', 3, 'SATYAJIT SAHOO', 'admin@aaa.com', '6372754900', 'dfwfrwf', 'aaxs', 'Odisha', '123456', NULL, 1, 139.99, 'approved', '2025-06-02 08:06:51'),
('6f1be51d-967b-432e-870a-f8a17e176a63', 5, 'SATYAJIT SAHOO', 'admin@aaa.com', '6372754900', 'dfwfrwf', 'aaxs', 'Odisha', '123456', 'Green / 11', 1, 89.99, 'approved', '2025-06-02 07:26:44'),
('6f798bbb-587e-4bb4-bd20-d96b6c219502', 3, 'SATYAJIT SAHOO', 'admin@aaa.com', '6372754900', 'dfwfrwf', 'aaxs', 'Odisha', '123456', NULL, 1, 139.99, 'approved', '2025-06-02 08:08:32'),
('afa3f42a-b4b6-48b9-aac8-f241e4f65981', 1, 'John Doe', 'john@example.com', '9876543210', '123 Street', 'Mumbai', 'Maharashtra', '400001', 'Red / XL', 2, 159.98, 'pending', '2025-06-01 15:58:20'),
('b28c01e0-1b7e-4eb5-8383-faa7f84d17a5', 1, 'SATYAJIT SAHOO', 'satyajit+107@remotespeech.com', '6372754900', 'dfwfrwf', 'aaxs', 'Odisha', '123456', NULL, 1, 79.99, 'approved', '2025-06-01 18:04:59'),
('be957834-e531-431d-8b0a-79700f6ade7c', 1, 'SATYAJIT SAHOO', 'satyajit+107@remotespeech.com', '6372754900', 'dfwfrwf', 'aaxs', 'Odisha', '123456', NULL, 1, 79.99, 'approved', '2025-06-01 18:12:25'),
('f0393a3e-ce4a-4eba-99f6-f2036428503c', 2, 'SATYAJIT SAHOO', 'admin@aaa.com', '6372754900', 'dfwfrwf', 'aaxs', 'Odisha', '123456', NULL, 1, 119.99, 'approved', '2025-06-02 08:24:05'),
('f2e5adf0-90f2-400c-8a9c-eda001722810', 1, 'SATYAJIT SAHOO', 'admin@aaa.com', '6372754900', 'dfwfrwf', 'aaxs', 'Odisha', '123456', NULL, 1, 79.99, 'approved', '2025-06-01 15:05:41');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `razorpay_payment_id` varchar(255) DEFAULT NULL,
  `razorpay_order_id` varchar(255) DEFAULT NULL,
  `razorpay_signature` text DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `order_id`, `razorpay_payment_id`, `razorpay_order_id`, `razorpay_signature`, `status`, `created_at`) VALUES
(1, '11eeb650-6b21-418b-9887-6602aedb264c', 'pay_Qc1nsLS1TMa4yA', 'plink_Qc1ndJh5osxX8o', 'c7eac7b5a76691f56ac8ca050f39ef3566d0aa9584c5a1a14fd0847256af4054', 'success', '2025-06-01 18:21:21'),
(2, '11eeb650-6b21-418b-9887-6602aedb264c', 'pay_Qc1nsLS1TMa4yA', 'plink_Qc1ndJh5osxX8o', 'c7eac7b5a76691f56ac8ca050f39ef3566d0aa9584c5a1a14fd0847256af4054', 'success', '2025-06-01 18:21:21'),
(3, '11eeb650-6b21-418b-9887-6602aedb264c', 'pay_Qc1nsLS1TMa4yA', 'plink_Qc1ndJh5osxX8o', 'c7eac7b5a76691f56ac8ca050f39ef3566d0aa9584c5a1a14fd0847256af4054', 'success', '2025-06-01 18:21:23'),
(4, '11eeb650-6b21-418b-9887-6602aedb264c', 'pay_Qc1nsLS1TMa4yA', 'plink_Qc1ndJh5osxX8o', 'c7eac7b5a76691f56ac8ca050f39ef3566d0aa9584c5a1a14fd0847256af4054', 'success', '2025-06-01 18:21:23'),
(5, '11eeb650-6b21-418b-9887-6602aedb264c', 'pay_Qc1nsLS1TMa4yA', 'plink_Qc1ndJh5osxX8o', 'c7eac7b5a76691f56ac8ca050f39ef3566d0aa9584c5a1a14fd0847256af4054', 'success', '2025-06-01 18:23:13'),
(6, '11eeb650-6b21-418b-9887-6602aedb264c', 'pay_Qc1nsLS1TMa4yA', 'plink_Qc1ndJh5osxX8o', 'c7eac7b5a76691f56ac8ca050f39ef3566d0aa9584c5a1a14fd0847256af4054', 'success', '2025-06-01 18:23:13'),
(7, '11eeb650-6b21-418b-9887-6602aedb264c', 'pay_Qc1nsLS1TMa4yA', 'plink_Qc1ndJh5osxX8o', 'c7eac7b5a76691f56ac8ca050f39ef3566d0aa9584c5a1a14fd0847256af4054', 'success', '2025-06-01 18:24:54'),
(8, '11eeb650-6b21-418b-9887-6602aedb264c', 'pay_Qc1nsLS1TMa4yA', 'plink_Qc1ndJh5osxX8o', 'c7eac7b5a76691f56ac8ca050f39ef3566d0aa9584c5a1a14fd0847256af4054', 'success', '2025-06-01 18:24:54'),
(9, '11eeb650-6b21-418b-9887-6602aedb264c', 'pay_Qc1nsLS1TMa4yA', 'plink_Qc1ndJh5osxX8o', 'c7eac7b5a76691f56ac8ca050f39ef3566d0aa9584c5a1a14fd0847256af4054', 'success', '2025-06-01 18:26:20'),
(10, '11eeb650-6b21-418b-9887-6602aedb264c', 'pay_Qc1nsLS1TMa4yA', 'plink_Qc1ndJh5osxX8o', 'c7eac7b5a76691f56ac8ca050f39ef3566d0aa9584c5a1a14fd0847256af4054', 'success', '2025-06-01 18:26:20'),
(11, '11eeb650-6b21-418b-9887-6602aedb264c', 'pay_Qc1nsLS1TMa4yA', 'plink_Qc1ndJh5osxX8o', 'c7eac7b5a76691f56ac8ca050f39ef3566d0aa9584c5a1a14fd0847256af4054', 'success', '2025-06-01 18:26:39'),
(12, '11eeb650-6b21-418b-9887-6602aedb264c', 'pay_Qc1nsLS1TMa4yA', 'plink_Qc1ndJh5osxX8o', 'c7eac7b5a76691f56ac8ca050f39ef3566d0aa9584c5a1a14fd0847256af4054', 'success', '2025-06-01 18:26:39');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `variant` varchar(255) DEFAULT NULL,
  `inventory` int(11) DEFAULT 0,
  `image_url` varchar(500) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `is_new` tinyint(1) DEFAULT 0,
  `is_hot` tinyint(1) DEFAULT 0,
  `rating` decimal(2,1) DEFAULT NULL,
  `reviews` int(11) DEFAULT 0,
  `colors` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`colors`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `price`, `variant`, `inventory`, `image_url`, `category`, `is_new`, `is_hot`, `rating`, `reviews`, `colors`) VALUES
(1, 'Converse Chuck Taylor All Star II', 'High-top sneakers with premium comfort and timeless style.', 79.99, 'Black / 9', 37, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', 'Performance', 1, 0, 4.9, 124, '[\"#000000\", \"#FFFFFF\", \"#FF0000\"]'),
(2, 'Nike Air Max 270', 'Breathable mesh with a large air unit in the heel for a smooth ride.', 119.99, 'White / 10', 29, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop', 'Lifestyle', 0, 1, 4.8, 89, '[\"#00F5FF\", \"#FFFF00\", \"#FF00FF\"]'),
(3, 'Adidas Ultraboost 22', 'Responsive running shoes with sock-like fit and Boost cushioning.', 139.99, 'Blue / 8', 18, 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop', 'Premium', 1, 1, 5.0, 203, '[\"#8B00FF\", \"#00F5FF\", \"#000000\"]'),
(4, 'Vans Old Skool', 'Classic skate shoes with durable canvas and suede uppers.', 59.99, 'Red / 10', 40, 'https://images.unsplash.com/photo-1551107696-a4b57a9d33b8?w=400&h=400&fit=crop', 'Casual', 0, 0, 4.7, 156, '[\"#FFFFFF\", \"#000000\", \"#808080\"]'),
(5, 'Puma RS-X', 'Chunky sneaker with bold colors and retro-futuristic style.', 89.99, 'Green / 11', 24, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', 'Limited', 0, 1, 4.6, 92, '[\"#FF00FF\", \"#00F5FF\", \"#FFFFFF\"]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
