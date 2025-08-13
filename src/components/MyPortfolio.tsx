import React, { useEffect } from "react";
import '../styles/style.css';
import profilePicture from '../img/profile.webp';

export default function MyPortfolio() {
    useEffect(() => {
        // Navbar scroll effect
        const navbar = document.getElementById("navbar");
        const onScrollNav = () => {
            if (!navbar) return;
            if (window.scrollY > 100) navbar.classList.add("scrolled");
            else navbar.classList.remove("scrolled");
        };
        window.addEventListener("scroll", onScrollNav);

        // Smooth scrolling for navigation links
        const anchors = Array.from(document.querySelectorAll('a[href^="#"]')) as HTMLAnchorElement[];
        const onAnchorClick = (e: Event) => {
            e.preventDefault();
            const el = e.currentTarget as HTMLAnchorElement;
            const target = document.querySelector(el.getAttribute("href") || "");
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        };
        anchors.forEach((a) => a.addEventListener("click", onAnchorClick));

        // Intersection Observer for fade-ins
        const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add("visible");
            });
        }, observerOptions);
        const fadeIns = Array.from(document.querySelectorAll(".fade-in"));
        fadeIns.forEach((el) => io.observe(el));

        // Scroll-to-top button
        const scrollTopBtn = document.getElementById("scrollTop");
        const onScrollTopToggle = () => {
            if (!scrollTopBtn) return;
            if (window.pageYOffset > 300) scrollTopBtn.classList.add("show");
            else scrollTopBtn.classList.remove("show");
        };
        const onScrollTopClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
        window.addEventListener("scroll", onScrollTopToggle);
        scrollTopBtn?.addEventListener("click", onScrollTopClick);

        // Parallax effect on hero
        const hero = document.querySelector(".hero") as HTMLElement | null;
        const onParallax = () => {
            if (hero) hero.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
        };
        window.addEventListener("scroll", onParallax);

        // Button ripple effect
        const addRipple: EventListener = (e) => {
            const btn = e.currentTarget as HTMLElement | null;
            if (!btn) return;
            const mouse = e as MouseEvent;
            const ripple = document.createElement("span");
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = mouse.clientX - rect.left - size / 2;
            const y = mouse.clientY - rect.top - size / 2;
            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";
            ripple.classList.add("ripple");
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        };

        const ripples = Array.from(document.querySelectorAll<HTMLElement>(".btn, .project-link"));
        ripples.forEach((b) => b.addEventListener("click", addRipple));

        // Cleanup
        return () => {
            window.removeEventListener("scroll", onScrollNav);
            anchors.forEach((a) => a.removeEventListener("click", onAnchorClick));
            io.disconnect();
            window.removeEventListener("scroll", onScrollTopToggle);
            scrollTopBtn?.removeEventListener("click", onScrollTopClick);
            window.removeEventListener("scroll", onParallax);
            ripples.forEach((b) => b.removeEventListener("click", addRipple));
        };
    }, []);

    useEffect(() => {
        const wrap = document.querySelector('.card-wrap') as HTMLElement | null;           // 기준
        const container = document.querySelector('.profile-container') as HTMLElement | null; // 회전 대상
        const overlay = document.querySelector('.overlay') as HTMLElement | null;
        if (!wrap || !container || !overlay) return;

        const MAX = 30; // 회전 정도
        let rect = wrap.getBoundingClientRect();

        const updateRect = () => { rect = wrap.getBoundingClientRect(); };
        window.addEventListener('resize', updateRect);
        window.addEventListener('scroll', updateRect, true);

        const handleEnter = () => updateRect();

        const handleMove = (e: MouseEvent) => {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // 중심 정규화: -0.5 ~ 0.5 (가운데가 0)
            const px = x / rect.width - 0.5;
            const py = y / rect.height - 0.5;

            const rotateY = px * MAX;   // 오른쪽으로 갈수록 +
            const rotateX = -py * MAX;  // 위로 갈수록 +

            container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            overlay.style.backgroundPosition = `${50 + px * 70}% ${50 + py * 70}%`;
            const opacity = Math.min(1, Math.max(0, Math.hypot(px, py) * 2));
            overlay.style.filter = `opacity(${opacity}) brightness(1.2)`;
        };

        const handleLeave = () => {
            overlay.style.filter = 'opacity(0)';
            container.style.transform = 'rotateX(0deg) rotateY(0deg)';
        };

        wrap.addEventListener('mouseenter', handleEnter);
        wrap.addEventListener('mousemove', handleMove);
        wrap.addEventListener('mouseleave', handleLeave);

        return () => {
            wrap.removeEventListener('mouseenter', handleEnter);
            wrap.removeEventListener('mousemove', handleMove);
            wrap.removeEventListener('mouseleave', handleLeave);
            window.removeEventListener('resize', updateRect);
            window.removeEventListener('scroll', updateRect, true);
        };
    }, []);

    return (
        <div>
            {/* Navigation */}
            <nav className="navbar" id="navbar">
                <div className="nav-container">
                    <a href="#home" className="logo">Portfolio</a>
                    <ul className="nav-menu">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="hero">
                <div className="hero-container">
                    <div className="hero-content">

                        <h1 className="hero-title">Growth-Oriented <span className="hero-gradient">Developer</span></h1>
                        <p className="hero-description">
                            협업과 커뮤니케이션을 중시하며, 지속적인 학습을 통해 함께 성장하는 개발자가 되기를 지향합니다.<br />
                            새로운 기술과 도전을 두려워하지 않고 항상 나아갑니다.
                        </p>
                        {/* Typing line from original script (added missing element) */}
                        <div className="hero-buttons">
                            <a href="#projects" className="btn btn-primary">
                                <span className="material-symbols-outlined">work</span>
                                프로젝트 보기
                            </a>
                            <a href="#contact" className="btn btn-secondary">
                                <span className="material-symbols-outlined">mail</span>
                                연락하기
                            </a>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="card-wrap">
                            <div className="profile-container">
                                <div className="overlay"></div>
                                <div className="card"></div>
                                <div className="shine"></div>
                                <div className="card-shadow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">About Me</div>
                        <h2 className="section-title">저를 소개합니다</h2>
                        <p className="section-description">끊임없는 학습과 혁신을 통해 더 나은 개발자로 성장하고 있습니다.</p>
                    </div>

                    <div className="about-grid">
                        <div className="about-image fade-in visible">
                            <div className="about-photo">
                                <img src={profilePicture} alt="프로필 이미지" />
                            </div>
                        </div>
                        <div className="about-content fade-in visible">
                            <h3>윤성찬 &nbsp; | &nbsp; 학습이 빠른 개발자</h3>
                            <p>
                                Java를 주력 언어로 사용하며, Spring과 Spring Boot를 기반으로 한 웹 애플리케이션 개발에 집중하고 있습니다.
                                최신 기술과 아키텍처를 적용하여 안정적이고 확장 가능한 시스템을 구축하기 위해 끊임없이 노력합니다.
                                또한 지속적인 학습과 성장에 힘쓰고 있으며, 다양한 프로젝트와 협업 경험을 통해 문제 해결 능력과 커뮤니케이션 역량을 강화하고 있습니다.
                            </p>
                            <p>
                                새기술 공유를 중요하게 생각하여 이해가 쉬운 방향으로 정리를 하고 공유를 진행합니다.<br />
                                책과 강의를 통해 지속적으로 학습하고 있습니다.
                            </p>
                        </div>
                    </div>

                    {/* Education & Certificates */}
                    <div className="education-certificates-section">
                        <div className="education-certificates-grid">
                            <div className="info-card education-card fade-in visible">
                                <div className="card-header">
                                    <div className="card-icon">
                                        <span className="material-symbols-outlined">school</span>
                                    </div>
                                    <h3 className="card-title">학력</h3>
                                </div>
                                <div className="card-content">
                                    <div className="education-item">
                                        <div className="education-period">2021.03 - 2025.02</div>
                                        <div className="education-school">강릉원주대학교</div>
                                        <div className="education-major">정보통신공학과</div>
                                        <div className="education-status">4년제 학사</div>
                                    </div>
                                    <div className="education-item">
                                        <div className="education-period">2018.03 - 2020.02</div>
                                        <div className="education-school">광운대학교 정보과학교육원</div>
                                        <div className="education-major">정보보안과</div>
                                        <div className="education-status">4년제 학사</div>
                                    </div>
                                    <div className="education-item">
                                        <div className="education-period">2025.02 - 2025.07</div>
                                        <div className="education-school">중앙정보처리학원</div>
                                        <div className="education-major">클라우드 데브옵스 프론트엔드&백엔드 JAVA 풀스택 개발자 취업캠프</div>
                                        <div className="education-status">수료</div>
                                    </div>
                                </div>
                            </div>

                            <div className="info-card certificates-card fade-in visible">
                                <div className="card-header">
                                    <div className="card-icon">
                                        <span className="material-symbols-outlined">verified</span>
                                    </div>
                                    <h3 className="card-title">자격증</h3>
                                </div>
                                <div className="card-content">
                                    <div className="certificate-item">
                                        <div className="certificate-name">네트워크관리사 2급</div>
                                        <div className="certificate-org">한국정보통신자격협회(ICQA)</div>
                                        <div className="certificate-date">2019.06</div>
                                    </div>
                                    <div className="certificate-item">
                                        <div className="certificate-name">제한무선통신사</div>
                                        <div className="certificate-org">한국방송통신전파진흥원</div>
                                        <div className="certificate-date">2021.10</div>
                                    </div>
                                    <div className="certificate-item">
                                        <div className="certificate-name">정보처리기사</div>
                                        <div className="certificate-org">한국산업인력공단</div>
                                        <div className="certificate-date">2024.09(예정)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="section section-alt">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Skills</div>
                        <h2 className="section-title">기술 스택</h2>
                        <p className="section-description">실무 중심의 백엔드 개발 역량과 데이터베이스, 인프라, 협업 기술을 보유하고 있습니다.</p>
                    </div>
                    <div className="skills-grid">
                        {/* Backend */}
                        <div className="skill-card fade-in">
                            <div className="skill-icon"><span className="material-symbols-outlined">storage</span></div>
                            <h3 className="skill-title">Backend Development</h3>
                            <p className="skill-description">객체지향 설계를 바탕으로 확장 가능한 API와 안정적인 서버 애플리케이션을 구현합니다.</p>
                            <div className="skill-tags">
                                <span className="skill-tag">Java (8~21)</span>
                                <span className="skill-tag">Spring Boot</span>
                                <span className="skill-tag">JSP / Servlet</span>
                                <span className="skill-tag">JPA</span>
                                <span className="skill-tag">MyBatis</span>
                                <span className="skill-tag">Spring Security</span>
                                <span className="skill-tag">JWT</span>
                            </div>
                        </div>

                        {/* Database */}
                        <div className="skill-card fade-in">
                            <div className="skill-icon"><span className="material-symbols-outlined">dataset</span></div>
                            <h3 className="skill-title">Database & Caching</h3>
                            <p className="skill-description">업무 도메인에 맞는 스키마 설계, 인덱싱 및 튜닝을 통해 효율적인 데이터 처리를 수행합니다.</p>
                            <div className="skill-tags">
                                <span className="skill-tag">MySQL</span>
                                <span className="skill-tag">Oracle XE</span>
                                <span className="skill-tag">Redis</span>
                                <span className="skill-tag">SQL</span>
                            </div>
                        </div>

                        {/* DevOps (+ Git/GitHub 포함) */}
                        <div className="skill-card fade-in">
                            <div className="skill-icon"><span className="material-symbols-outlined">cloud</span></div>
                            <h3 className="skill-title">DevOps & Collaboration</h3>
                            <p className="skill-description">리눅스 기반 환경에서 컨테이너·클라우드 인프라를 구성하고 CI/CD와 형상관리를 통해 안정적으로 배포합니다.</p>
                            <div className="skill-tags">
                                <span className="skill-tag">Ubuntu Linux</span>
                                <span className="skill-tag">Docker</span>
                                <span className="skill-tag">Docker Compose</span>
                                <span className="skill-tag">Nginx</span>
                                <span className="skill-tag">AWS EC2/RDS/S3</span>
                                <span className="skill-tag">Git</span>
                                <span className="skill-tag">GitHub</span>
                            </div>
                        </div>

                        {/* Real-Time Communication (신규) */}
                        <div className="skill-card fade-in">
                            <div className="skill-icon"><span className="material-symbols-outlined">videocam</span></div>
                            <h3 className="skill-title">Real-Time Communication</h3>
                            <p className="skill-description">저지연 통신을 위한 시그널링/미디어 처리 파이프라인을 설계하고 실시간 상호작용 기능을 제공합니다.</p>
                            <div className="skill-tags">
                                <span className="skill-tag">WebSocket (STOMP)</span>
                                <span className="skill-tag">WebRTC</span>
                                <span className="skill-tag">Janus.js</span>
                                <span className="skill-tag">Janus WebRTC Server</span>
                                <span className="skill-tag">MediaRecorder API</span>
                            </div>
                        </div>

                        {/* Frontend */}
                        <div className="skill-card fade-in">
                            <div className="skill-icon"><span className="material-symbols-outlined">code</span></div>
                            <h3 className="skill-title">Frontend Development</h3>
                            <p className="skill-description">웹 표준을 준수하여 접근성과 성능을 고려한 UI를 구현하고 API와의 연동을 최적화합니다.</p>
                            <div className="skill-tags">
                                <span className="skill-tag">HTML5</span>
                                <span className="skill-tag">CSS3</span>
                                <span className="skill-tag">JavaScript</span>
                                <span className="skill-tag">TypeScript</span>
                                <span className="skill-tag">React</span>
                                <span className="skill-tag">Thymeleaf</span>
                                <span className="skill-tag">Axios</span>
                                <span className="skill-tag">Redux</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">Portfolio</div>
                        <h2 className="section-title">주요 프로젝트</h2>
                        <p className="section-description">저의 프로젝트들을 소개합니다.</p>
                    </div>

                    <div className="projects-grid">
                        <div className="project-card fade-in">
                            <div className="project-image"><span className="material-symbols-outlined">chat</span></div>
                            <div className="project-content">
                                <h3 className="project-title">게임 할인 정보 제공 사이트</h3>
                                <p className="project-description">
                                    프로젝트명: 겜세모<br />
                                    6인 프로젝트<br />
                                    프로젝트 기간: 2025.06(4주)<br />
                                    플랫폼별 게임 세일정보를 쉽게 찾을수 있는 게임세일모아 웹사이트 프로젝트 입니다. <br />
                                    여러 게임 판매 플랫폼을 크롤링 하여 매일 최신화된 게임 할인 정보를 보여줍니다. <br />
                                    게임 위시리스트 기능과, 커뮤니티 기능까지 지원합니다.
                                </p>
                                <div className="project-tech">
                                    <span className="tech-tag">Spring Boot</span>
                                    <span className="tech-tag">Java 17</span>
                                    <span className="tech-tag">Oracle XE 11g</span>
                                    <span className="tech-tag">Mybatis</span>
                                    <span className="tech-tag">JSP</span>
                                    <span className="tech-tag">웹 크롤링</span>
                                </div>
                                <div className="project-docs">
                                    <a href="#" target="_blank" rel="noreferrer">프로젝트 소개(추가 예정)</a>
                                </div>
                                <div className="project-links">
                                    <a href="http://3.34.122.138" className="project-link project-link-primary" target="_blank" rel="noreferrer">
                                        <span className="material-symbols-outlined">link</span>
                                        Link
                                    </a>
                                    <a href="https://github.com/wlee412/Gamesemo" className="project-link project-link-secondary" target="_blank" rel="noreferrer">
                                        <span className="material-symbols-outlined">code</span>
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="project-card fade-in">
                            <div className="project-image"><span className="material-symbols-outlined">shopping_cart</span></div>
                            <div className="project-content">
                                <h3 className="project-title">원격 정신 상담 사이트</h3>
                                <p className="project-description">
                                    프로젝트명: n:ear<br />
                                    6인 프로젝트<br />
                                    프로젝트 기간: 2025.07(4주)<br />
                                    WebRTC와 WebSocket을 활용하여 상담자와 내담자 모두에게 쉽고 편리한 상담 환경을 제공하는 웹 플랫폼입니다.<br />
                                    정신 건강 상태를 자가 진단 및 관리할 수 있는 다양한 도구와 컨텐츠를 제공합니다.<br />
                                </p>
                                <div className="project-tech">
                                    <span className="tech-tag">Spring Boot</span>
                                    <span className="tech-tag">Java 17</span>
                                    <span className="tech-tag">MySQL 8</span>
                                    <span className="tech-tag">MyBatis</span>
                                    <span className="tech-tag">JSP</span>
                                    <span className="tech-tag">WebSocket</span>
                                    <span className="tech-tag">WebRTC</span>
                                    <span className="tech-tag">Janus Client</span>
                                </div>
                                <div className="project-docs">
                                    <a href="#" target="_blank" rel="noreferrer">프로젝트 소개(추가 예정)</a>
                                </div>
                                <div className="project-links">
                                    <a href="https://52.79.239.2.nip.io" className="project-link project-link-primary" target="_blank" rel="noreferrer">
                                        <span className="material-symbols-outlined">link</span>
                                        Link
                                    </a>
                                    <a href="https://github.com/wlee412/near" className="project-link project-link-secondary" target="_blank" rel="noreferrer">
                                        <span className="material-symbols-outlined">code</span>
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="project-card fade-in">
                            <div className="project-image"><span className="material-symbols-outlined">analytics</span></div>
                            <div className="project-content">
                                <h3 className="project-title">인증 로직 보완</h3>
                                <p className="project-description">
                                    개인 학습<br />
                                    JWT 엑세스 토큰과 Http Only 쿠키를 이용한 인증 및 인가 서비스 로직 구현<br />
                                    JWT 리프레시 토큰과 Redis를 이용한 토큰 리프레시 로직 구현<br />
                                    획일화된 API 응답과 전역 예외처리
                                </p>
                                <div className="project-tech">
                                    <span className="tech-tag">Spring Boot</span>
                                    <span className="tech-tag">Java 17</span>
                                    <span className="tech-tag">React</span>
                                    <span className="tech-tag">TypeScript</span>
                                    <span className="tech-tag">MySQL 8</span>
                                    <span className="tech-tag">JPA</span>
                                    <span className="tech-tag">JWT</span>
                                    <span className="tech-tag">Redis</span>
                                    <span className="tech-tag">Docker Compose</span>
                                </div>
                                <div className="project-docs">
                                    <a href="#" target="_blank" rel="noreferrer">프로젝트 소개(추가 예정)</a>
                                </div>
                                <div className="project-links">
                                    <a href="https://github.com/Dae-Ban/jwt-board-springboot" className="project-link project-link-secondary" target="_blank" rel="noreferrer">
                                        <span className="material-symbols-outlined">code</span>
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="section section-alt">
                <div className="container">
                    <div className="contact">
                        <div className="contact-title">함께 만들어가요</div>
                        <p className="contact-description">새로운 프로젝트나 협업 기회에 대해 이야기하고 싶으시다면 언제든 연락주세요!</p>
                        <div className="contact-info">
                            <div className="contact-item fade-in">
                                <span className="material-symbols-outlined">mail</span>
                                <h4>이메일</h4>
                                <a href="mailto:hih1217@skuniv.ac.kr">ysc1086@gmail.com</a>
                            </div>
                            <div className="contact-item fade-in">
                                <span className="material-symbols-outlined">phone</span>
                                <h4>전화번호</h4>
                                <a href="tel:+821022691087">010-2269-1087</a>
                            </div>
                            <div className="contact-item fade-in">
                                <span className="material-symbols-outlined">code</span>
                                <h4>GitHub</h4>
                                <a href="https://github.com/Dae-Ban" target="_blank" rel="noreferrer">github.com/Dae-Ban</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>© 2025 윤성찬. All rights reserved.</p>
                </div>
            </footer>

            {/* Scroll to Top Button */}
            <button className="scroll-top" id="scrollTop">
                <span className="material-symbols-outlined">keyboard_arrow_up</span>
            </button>
        </div>
    );
}
