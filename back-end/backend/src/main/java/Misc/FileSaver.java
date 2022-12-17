package Misc;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Date;

public class FileSaver {
    public static String  saveFile(MultipartFile file, String fileName) {
        try {
            byte[] bytes = file.getBytes();
            String path = "./src/main/resources/uploads/" + fileName;
            Files.write(Paths.get(path), bytes);
            return path;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
