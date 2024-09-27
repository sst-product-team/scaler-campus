-- CreateTable
CREATE TABLE `SSOProvider` (
    `sso_provider_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `home_url` VARCHAR(191) NOT NULL,
    `privacy_policy` VARCHAR(191) NOT NULL,
    `auth_redirect_url` VARCHAR(191) NOT NULL,
    `created_on` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_on` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`sso_provider_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
