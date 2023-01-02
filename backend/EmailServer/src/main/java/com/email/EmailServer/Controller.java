package com.email.EmailServer;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:63187"})
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
    public String SendEmail(@RequestBody String data){
        return proxy.run("SendEmail",new JSONObject(data));
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

}
