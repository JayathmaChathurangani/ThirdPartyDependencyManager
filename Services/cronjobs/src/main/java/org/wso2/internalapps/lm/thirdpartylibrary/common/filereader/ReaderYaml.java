package org.wso2.internalapps.lm.thirdpartylibrary.common.filereader;

import java.io.FileReader;
import java.io.IOException;

public class ReaderYaml {
    public static POJO_Config_File readYaml() throws IOException {

        com.esotericsoftware.yamlbeans.YamlReader reader = new com.esotericsoftware.yamlbeans.YamlReader(new FileReader("/config/LM_DB_Configs.yml"));

        POJO_Config_File remoteRepoConfigurations= reader.read(POJO_Config_File.class);

        return remoteRepoConfigurations;
    }
}
