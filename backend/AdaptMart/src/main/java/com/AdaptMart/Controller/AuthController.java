package com.AdaptMart.Controller;

import com.AdaptMart.Dao.User;
import com.AdaptMart.Dto.AuthRequest;
import com.AdaptMart.Dto.AuthResponse;
import com.AdaptMart.Dto.RegisterRequest;
import com.AdaptMart.Repository.UserRepository;
import com.AdaptMart.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
public class AuthController {



    @Autowired
    private AuthenticationManager authManager;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private UserDetailsService userDetailsService;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req){
        Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));

        UserDetails ud = (UserDetails) auth.getPrincipal();


        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String token = jwtUtil.generateToken(ud, user.getRole());

        AuthResponse response = new AuthResponse(token,user.getId(),user.getUserName(),user.getEmail());
        return ResponseEntity.ok(response);

    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest req) {

        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }


        User user = new User();
        user.setUserName(req.getUserName());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole("USER");
        user.setEmail(req.getEmail());

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }


}
