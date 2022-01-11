package com.jayden.testapi.controllers;

import com.jayden.testapi.Util.EmailTakenException;
import com.jayden.testapi.Util.IncrorrectPasswordException;
import com.jayden.testapi.entity.ResponseObj;
import com.jayden.testapi.entity.Client;
import com.jayden.testapi.entity.ClientResponse;
import com.jayden.testapi.services.ClientService;
import javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path="api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final ClientService clientService;

    public UserController(ClientService clientService) {
        this.clientService = clientService;
    }

    /*
     *  @POST /api/users/add
     *  @DESC - Add a new user to the database
     * */
    @PostMapping(path = "/add")
    public ClientResponse addUser(@RequestBody Client user) throws EmailTakenException {
        return clientService.addUser(user);
    }

    /*
     *  @POST /api/users/load
     *  @DESC - load a user based on token and return the user and the sessions for the user
     * */
    @GetMapping("/load")
    public ClientResponse loadUser(@RequestHeader("authorization") String token) throws NotFoundException {
        return clientService.loadUser(token);
    }

    /*
     *  @GET /api/users/login
     *  @DESC - Login a user (different to load as a password check is done)
     * */
    @PostMapping(path = "/login")
    public ClientResponse loginUser(@RequestBody Client user) throws IncrorrectPasswordException, NotFoundException {
        return clientService.loginUser(user.getEmail(), user.getPassword());
    }

    /*
     *  @DELETE /api/users/delete/{userId}
     *  @DESC - Delete a user (close account) based on a userId
     * */
    @DeleteMapping(path = "/delete/{userId}")
    public HttpStatus deleteUser(@PathVariable("userId") Long userId) throws NotFoundException {
        return clientService.deleteUser(userId);
    }

    /*
     *  @GET /api/users/token
     *  @DESC - Generate a new token after the old one has expired (can only be accessed when there is a token
     * */
    @GetMapping("/token/{oldToken}")
    public String getToken(@PathVariable("oldToken") String oldToken) {
        return clientService.signNewClientToken(oldToken);
    }

    /*
     *  @POST/api/users/assign-trainer/{clientId}/{trainerId}
     *  @DESC - Generate a new token after the old one has expired (can only be accessed when there is a token
     * */
    @PostMapping("/assign-trainer/{userId}/{trainerId}")
    public HttpStatus assignTrainer(@PathVariable("userId") Long userId, @PathVariable("trainerId") Long trainerId) throws NotFoundException {
        return clientService.assignTrainer(userId, trainerId);
    }

    @PostMapping("/set-account-privacy/{userId}/{type}")
    public String setAccountPrivacy(@PathVariable("userId") Long id, @PathVariable("type") String type) throws NotFoundException {
        return clientService.setAccountPrivacy(id, type);
    }
}
