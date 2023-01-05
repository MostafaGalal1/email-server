package com.email.EmailServer;

import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = {})
@RestController
@RequestMapping("/Email")
public class Controller {
    private final Proxy proxy;

    public Controller(Proxy proxy) { this.proxy = proxy; }

    @PutMapping("/SignUp")
    @ResponseBody
    public String SignUp(@RequestBody String data){
        return proxy.run("SignUp", new JSONObject(data));
    }

    @PostMapping("/LogIn")
    @ResponseBody
    public String LogIn(@RequestBody String data){
        return proxy.run("LogIn",new JSONObject(data));
    }

    @PostMapping("/AddFolder")
    @ResponseBody
    public String AddFolder(@RequestBody String data){
        return proxy.run("AddFolder", new JSONObject(data));
    }

    @DeleteMapping("/DeleteFolder")
    @ResponseBody
    public String DeleteFolder(@RequestBody String data){
        return proxy.run("DeleteFolder",new JSONObject(data));
    }

    @PostMapping("/RenameFolder")
    @ResponseBody
    public String RenameFolder(@RequestBody String data){
        return proxy.run("RenameFolder",new JSONObject(data));
    }

    @PostMapping("/GetAllFolders")
    @ResponseBody
    public String GetAllFolders(@RequestBody String data){
        return proxy.run("GetAllFolders",new JSONObject(data));
    }

    @PostMapping("/SendEmail")
    @ResponseBody
    public String SendEmail(@RequestPart(name ="files",required = false) MultipartFile[] Files , @RequestParam(name ="mail") String data) throws IOException {
        List<JSONObject> jsonFiles = this.CreateJsonAttachments(Files);
        JSONObject jsonData = new JSONObject(data).put("attachments",jsonFiles);
        return proxy.run("SendEmail",jsonData);
    }

    @PostMapping("/GetFolderEmails")
    @ResponseBody
    public String GetFolderEmails(@RequestBody String data){
        return proxy.run("GetFolderEmails",new JSONObject(data));
    }

    @PostMapping("/SearchInFolder")
    @ResponseBody
    public String SearchInFolder(@RequestBody String data){
        return proxy.run("SearchInFolder",new JSONObject(data));
    }

    @PostMapping("/AddContact")
    @ResponseBody
    public String AddContact(@RequestBody String data){
        return proxy.run("AddContact", new JSONObject(data));
    }

    @PostMapping("/GetAllContacts")
    @ResponseBody
    public String GetAllContacts(@RequestBody String data){
        return proxy.run("GetAllContacts", new JSONObject(data));
    }

    @PostMapping("/EditContact")
    @ResponseBody
    public String EditContact(@RequestBody String data){
        return proxy.run("EditContact", new JSONObject(data));
    }

    @DeleteMapping("/DeleteContact")
    @ResponseBody
    public String DeleteContact(@RequestBody String data){
        return proxy.run("DeleteContact", new JSONObject(data));
    }

    @PostMapping("/MoveEmail")
    @ResponseBody
    public String MoveEmail(@RequestBody String data){
        return proxy.run("MoveEmail", new JSONObject(data));
    }

    @PostMapping("/SaveToDraft")
    @ResponseBody
    public String SaveToDraft(@RequestBody String data){
        System.out.println(data);
        return proxy.run("SaveToDraft", new JSONObject(data));
    }

    @DeleteMapping("/DeleteEmail")
    @ResponseBody
    public String DeleteEmail(@RequestBody String data){
        return proxy.run("DeleteEmail", new JSONObject(data));
    }

    @PostMapping("/RestoreEmail")
    @ResponseBody
    public String RestoreEmail(@RequestBody String data){
        return proxy.run("RestoreEmail", new JSONObject(data));
    }

    @PostMapping("/MoveToTrash")
    @ResponseBody
    public String MoveToTrash(@RequestBody String data){
        return proxy.run("MoveToTrash", new JSONObject(data));
    }

    @PostMapping("/GetAttachments")
    @ResponseBody
    public String GetAttachments(@RequestBody String data){
        return proxy.run("GetAttachments", new JSONObject(data));
    }


    private List<JSONObject> CreateJsonAttachments(MultipartFile[] Files){
        List<JSONObject> jsonFiles = new ArrayList<>();
        if (Files == null)
            return jsonFiles;
        for (MultipartFile file: Files){
            JSONObject jsonData = this.ExtractData(file);
            jsonFiles.add(jsonData);
        }
        return jsonFiles;
    }
    private JSONObject ExtractData(MultipartFile file){
        try {
            JSONObject jsonData = new JSONObject();
            jsonData.put("link",file.getBytes());
            jsonData.put("name",file.getOriginalFilename());
            jsonData.put("type",file.getContentType());
            return jsonData;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
