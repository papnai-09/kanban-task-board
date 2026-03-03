const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click",()=>{navLinks.classList.toggle("active");} );

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
themeToggle.addEventListener("click",()=>{body.classList.toggle("dark");
                                          if(body.classList.contains("dark"))
                                          {
                                              themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                                          } 
                                          else 
                                          {
                                              themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                                          } } );

