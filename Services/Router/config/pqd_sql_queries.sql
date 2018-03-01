ALTER TABLE `product_quality_dashboard`.`pqd_product`
ADD COLUMN `licensemanager_name` VARCHAR(200) NULL AFTER `sonar_project_key`;

UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2am' WHERE `pqd_product_id`='1';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2as' WHERE `pqd_product_id`='2';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2bps' WHERE `pqd_product_id`='3';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2cep' WHERE `pqd_product_id`='4';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2das' WHERE `pqd_product_id`='5';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2dss' WHERE `pqd_product_id`='6';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2ei' WHERE `pqd_product_id`='7';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2esb' WHERE `pqd_product_id`='8';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2iot' WHERE `pqd_product_id`='9';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2is' WHERE `pqd_product_id`='10';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2mb' WHERE `pqd_product_id`='11';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='ballerina' WHERE `pqd_product_id`='13';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2am-analytics' WHERE `pqd_product_id`='15';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2is-analytics' WHERE `pqd_product_id`='16';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2esb-analytics' WHERE `pqd_product_id`='18';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2ss' WHERE `pqd_product_id`='38';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2appfactory' WHERE `pqd_product_id`='37';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2sp' WHERE `pqd_product_id`='36';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2es' WHERE `pqd_product_id`='40';
UPDATE `product_quality_dashboard`.`pqd_product` SET `licensemanager_name`='wso2carbon' WHERE `pqd_product_id`='41';

