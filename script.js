// !Navigation
const body = document.body;
const navBar = document.getElementById(`navBar`);
const logo = document.getElementById(`logo`);
const navLinks = document.getElementById(`navLinks`);
const mobMenu = document.getElementById(`mobMenu`);
const mobClose = document.querySelector(`.mobClose`)
const jumpBtn = document.getElementById(`jumpBtn`)
let links;

function navBarShow() {
    navBar.style.transform = `translateY(-115%)`;
    if (window.innerWidth >= 384) {
        setTimeout(() => {
            navBar.style.transform = `translateY(0)`;
            navBar.style.transition = `transform 0.5s ease`;
        }, 5900);
    }
    else {
        setTimeout(() => {
            navBar.style.transform = `translateY(0)`;
            navBar.style.transition = `transform 0.5s ease`;
        }, 100);
    }
}
navBarShow();

function mobNav() {
    if (window.innerWidth <= 600) {
        mobMenu.style.visibility = `visible`;
        navBar.style.justifyContent = `space-between`;
        logo.style.marginLeft = `1.75rem`;
        mobMenu.style.marginRight = `1.75rem`;

        navBar.insertAdjacentElement(`beforebegin`, navLinks);

        navLinks.style.width = `100vw`;
        navLinks.style.height = `100vh`;
        navLinks.style.justifyContent = `center`;
        navLinks.style.flexDirection = `column`;
        navLinks.style.gap = `1.75rem 0`
        navLinks.style.alignItems = `center`;
        navLinks.style.backgroundColor = `var(--primary-colour)`;
        navLinks.style.transform = `translateX(-100%)`;
        navLinks.style.position = `fixed`;
        navLinks.style.fontSize = `1.5em`;
        navLinks.style.zIndex = `2`;
        mobClose.style.display = `block`;

        links = navLinks.querySelectorAll(`a`);
        links.forEach(link => {
            link.addEventListener(`click`, linkClick);
        });
    }
    else {
        mobMenu.style.visibility = ``;
        navBar.style.justifyContent = ``;
        logo.style.marginLeft = ``;
        mobMenu.style.marginRight = ``;

        navBar.insertBefore(navLinks, mobMenu);
        navLinks.style.width = ``;
        navLinks.style.height = ``;
        navLinks.style.justifyContent = ``;
        navLinks.style.flexDirection = ``;
        navLinks.style.gap = ``;
        navLinks.style.alignItems = ``;
        navLinks.style.backgroundColor = ``;
        navLinks.style.transform = ``;
        navLinks.style.position = ``;
        navLinks.style.fontSize = ``;
        navLinks.style.zIndex = ``;
        mobClose.style.display = ``;

        if (links) {
            links.forEach(link => {
                link.removeEventListener(`click`, linkClick);
            });
            links = null;
        }
    }
}
mobNav()
window.addEventListener(`resize`, mobNav)

mobMenu.addEventListener(`click`, () => {
    body.style.overflow = `hidden`;
    if (navLinks.style.transform === `translateX(-100%)`) {
        navLinks.style.transform = `translateX(0)`;
        navLinks.style.transition = `transform 0.25s ease`;
    }
    else {
        linkClick();
    }
});

function linkClick() {
    navLinks.style.transform = `translateX(-100%)`;
    navLinks.style.transition = `transform 0.25s ease`;
    body.style.overflow = ``;
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function scrollBtnShow() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        jumpBtn.style.transform = `translateY(0)`;
        jumpBtn.style.opacity = `1`;
        jumpBtn.style.visibility = `visible`;
        jumpBtn.style.transition = `all 0.15s ease`;
        navBar.style.boxShadow = `0 1px 10px #000000`;
        navBar.style.transition = `all 0.15s ease`;
    } else {
        jumpBtn.style.transform = ``;
        jumpBtn.style.opacity = ``;
        jumpBtn.style.visibility = ``;
        navBar.style.boxShadow = `none`;
    }
}
window.onscroll = function () { scrollBtnShow() };

// !Section jump
function sectionJump() {
    links = navLinks.querySelectorAll(`a`);
    links.forEach(link => {
        link.addEventListener(`click`, function (event) {
            event.preventDefault();
            const sectionId = this.getAttribute(`href`).substring(1);
            const section = document.getElementById(sectionId);

            if (section && navBar && sectionId !== `about`) {
                const navBarHeight = navBar.getBoundingClientRect().bottom;
                const sectionMarginTop = parseInt(getComputedStyle(section).marginTop); // top margin of section as an integer, to remove characters like px
                const scroll = section.getBoundingClientRect().top - navBarHeight - sectionMarginTop + 117 + window.scrollY;
                // [vertical position of top of section] - [height of navBar] - [top margin of section] + [adjusted scroll] + [number of pixels the document has already scrolled]
                window.scrollTo({ top: scroll });
            }
            else if (sectionId === `about`) {
                const scrollAbout = section.getBoundingClientRect().top - 133 + window.scrollY;
                window.scrollTo({ top: scrollAbout });

            }

            history.pushState(null, null, `#${sectionId}`); // Update URL with section that has been clicked on
        });
    });
}
sectionJump();

// !Intro height
const intro = document.getElementById(`intro`);

function introHeight() {
    const navBarHeight = navBar.offsetHeight;
    intro.style.height = `calc(100vh - ${navBarHeight}px)`
}
document.addEventListener(`DOMContentLoaded`, introHeight)
window.addEventListener(`resize`, introHeight);

// !Intro animations
const line1 = document.querySelector(`.line1`);
const line2 = document.querySelector(`.line2`);
const line3 = document.querySelector(`.line3`);
const lines = [line1, line2, line3];
const introLinks = document.querySelector(`#intro .links`)

function defaultStyling() {
    lines.forEach(line => {
        line.style.overflow = `visible`;
        line.style.width = `auto`;
        line.style.textAlign = ``;
        line.style.whiteSpace = ``;
        line.style.borderRight = ``
        line.style.paddingLeft = ``;
        line.style.borderRightColor = ``;
        line.style.animation = ``;
    });
    introLinks.style.opacity = ``;
    introLinks.style.visibility = ``;
    introLinks.style.animation = ``;
    body.style.overflow = ``;
}

function line1Animation() {
    if (window.innerWidth >= 384) {
        line1.style.textAlign = `start`;
        line1.style.borderRight = `0.65rem solid var(--secondary-colour)`
        line1.style.paddingLeft = `0.65rem`;
        line1.style.animation = `blink 1s step-start 2, typing 0.2s 2s steps(9, end) forwards`;
        setTimeout(() => {
            line1.style.borderRightColor = `var(--secondary-colour)`;
        }, 2000);
    }
    else {
        defaultStyling();
    }
}
function line1Border() {
    line1.style.borderRightColor = `transparent`;
}
line1.addEventListener(`animationend`, line1Border);

function line2Animation() {
    if (window.innerWidth >= 384) {
        line2.style.textAlign = `start`;
        line2.style.whiteSpace = `nowrap`;
        line2.style.borderRight = `0.65rem solid transparent`
        setTimeout(() => {
            line2.style.borderRightColor = `var(--secondary-colour)`;
        }, 2200);
        line2.style.animation = `typing 0.7s 2.2s steps(22, end) forwards, blink 1s 2.7s step-start 3`;
    }
    else {
        defaultStyling();
    }
}
function line2Border() {
    line2.style.borderRightColor = `transparent`;
}
line2.addEventListener(`animationend`, line2Border);

function line3Animation() {
    if (window.innerWidth >= 384) {
        line3.style.textAlign = `start`;
        line3.style.whiteSpace = `nowrap`;
        line3.style.borderRight = `0.65rem solid transparent`
        setTimeout(() => {
            line3.style.borderRightColor = `var(--secondary-colour)`;
        }, 5250);
        line3.style.animation = `typing 0.7s 5.25s steps(25, end) forwards, blink 1s 5.85s step-start infinite`;
    }
    else {
        defaultStyling();
    }
}

function introLinksAnimation() {
    if (window.innerWidth >= 384) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        introLinks.style.opacity = `0`;
        introLinks.style.visibility = `hidden`;
        introLinks.style.animation = `intro-slide-fade 0.5s 5.9s ease-out forwards`;
        body.style.overflow = `hidden`;
        body.style.paddingRight = `${scrollbarWidth}px`;
        setTimeout(() => {
            body.style.overflow = ``;
            body.style.paddingRight = ``;
        }, 5900);
    }
    else {
        defaultStyling();
    }
}

window.addEventListener(`resize`, () => {
    if (window.innerWidth < 384) {
        defaultStyling();
    }
});

line1Animation();
line2Animation();
line3Animation();
introLinksAnimation();

// !Corners
const aboutTopLeft = document.querySelectorAll(`#about .top-left`);
const aboutBottomRight = document.querySelectorAll(`#about .bottom-right`);
const projectsTopLeft = document.querySelectorAll(`#projects .top-left`);
const projectsBottomRight = document.querySelectorAll(`#projects .bottom-right`);

function inView(element) {
    const bound = element.getBoundingClientRect();

    return (
        bound.top >= 0 &&
        bound.left >= 0 &&
        bound.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bound.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener(`scroll`, function () {
    const aboutImg = document.querySelector(`#about .content img`);

    if (inView(aboutImg)) {
        aboutTopLeft.forEach(corner => {
            corner.style.animation = `top-left-corner 0.5s ease-out forwards`;
        });
        aboutBottomRight.forEach(corner => {
            corner.style.animation = `bottom-right-corner 0.5s ease-out forwards`;
        });
    }
});

window.addEventListener(`scroll`, function () {
    const projectsGif = document.querySelector(`#projects .projectType img`);

    if (inView(projectsGif)) {
        projectsTopLeft.forEach(corner => {
            corner.style.animation = `top-left-corner 0.5s ease-out forwards`;
        });
        projectsBottomRight.forEach(corner => {
            corner.style.animation = `bottom-right-corner 0.5s ease-out forwards`;
        });
    }
});

// !Section fade
function inViewAbout(element) {
    const bound = element.getBoundingClientRect();

    return (
        bound.top >= 0 &&
        bound.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

window.addEventListener(`scroll`, function () {
    const aboutTitle = document.querySelector(`#about h1`);
    const aboutContent = document.querySelectorAll(`#about .content p`);
    const aboutImg = document.querySelector(`#about .content img`);

    aboutTitle.style.opacity = `0`;
    aboutContent.forEach(p => {
        p.style.opacity = `0`;
    });
    aboutImg.style.opacity = `0`;

    if (inViewAbout(aboutImg)) {
        aboutTitle.style.animation = `about-fade 0.5s ease-out forwards`;
        aboutContent.forEach(p => {
            p.style.animation = `about-fade 0.5s ease-out forwards`;
        });
        aboutImg.style.animation = `about-fade 0.5s ease-out forwards`;
    }
});

window.addEventListener(`scroll`, function () {
    const techSkillsSection = document.querySelector(`#technicalSkills`);
    const techSkillsTitle = document.querySelector(`#technicalSkills h3`);
    const techSkillType = document.querySelectorAll(`#technicalSkills .skillType`);
    const artSection = document.querySelector(`#creativeSkills`);
    const artSkillsTitle = document.querySelector(`#creativeSkills h3`);
    const artSkillType = document.querySelectorAll(`#creativeSkills .skillType`);

    techSkillsTitle.style.opacity = `0`;
    artSkillsTitle.style.opacity = `0`;

    techSkillType.forEach(icon => {
        icon.style.transform = `scale(0)`;
    });

    artSkillType.forEach((icon, index) => {
        icon.style.transform = `scale(0)`;
        icon.style.animationDelay = `${index * 0.5}s`;
    });

    if (window.innerWidth >= 425) {
        if (inView(techSkillsSection)) {
            techSkillsTitle.style.animation = `skills-title-fade 0.5s ease-out forwards`;
            techSkillType.forEach((icon, index) => {
                icon.style.animation = `skills-icon-pop 0.5s ease-out forwards`;
                icon.style.animationDelay = `${index * 0.1}s`;
            });
        }
    }
    else if (window.innerWidth <= 427) {
        const thirdSvg = document.querySelectorAll(`#technicalSkills .skillType`)[2];
        if (inView(thirdSvg)) {
            techSkillsTitle.style.animation = `skills-title-fade 0.5s ease-out forwards`;
            techSkillType.forEach((icon, index) => {
                icon.style.animation = `skills-icon-pop 0.5s ease-out forwards`;
                icon.style.animationDelay = `${index * 0.1}s`;
            });
        }
    }
    if (inView(artSection)) {
        artSkillsTitle.style.animation = `skills-title-fade 0.5s ease-out forwards`;
        artSkillType.forEach((icon, index) => {
            icon.style.animation = `skills-icon-pop 0.5s ease-out forwards`;
            icon.style.animationDelay = `${index * 0.1}s`;
        });
    }
});

function inViewProjects(element) {
    const bound = element.getBoundingClientRect();

    return (
        bound.top >= 0 &&
        bound.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

window.addEventListener(`scroll`, function () {
    const projectsTitle = document.querySelector(`#projects h1`);
    const projectsContent = document.querySelectorAll(`#projects .content p`);
    const projectTypes = document.querySelectorAll(`#projects .projectType`);

    projectsTitle.style.opacity = `0`;

    projectTypes.forEach((Type, index) => {
        const Content = projectsContent[index];
        const Gif = Type.querySelector(`a`)

        Content.style.transform = `translateX(25%)`;
        Content.style.opacity = `0`;
        Gif.style.transform = `translateX(-20.5%)`;
        Gif.style.opacity = `0`;
        Gif.style.visibility = `hidden`;

        if (index === 0 && inViewProjects(Gif)) {
            projectsTitle.style.animation = `projects-fade 0.5s ease-out forwards`;
        }

        if (inViewProjects(Gif)) {
            Content.style.animation = `projects-slide 0.5s ease-out forwards`;
            Gif.style.animation = `projects-slide 0.5s ease-out forwards`;
            Gif.style.visibility = `visible`
        }
    });
});

window.addEventListener(`scroll`, function () {
    const contactSection = document.querySelector(`#contact`);
    const contactTitle = document.querySelector(`#contact h1`);
    const contactContent = document.querySelector(`#contact .content p`);
    const contactCV = document.querySelector(`#contact .content .btn`);

    contactTitle.style.opacity = `0`;
    contactContent.style.opacity = `0`
    contactCV.style.opacity = `0`

    if (inView(contactSection)) {
        contactTitle.style.animation = `contact-fade 0.5s ease-out forwards`;
        contactContent.style.animation = `contact-fade 0.5s ease-out forwards`;
        contactCV.style.animation = `contact-fade 0.5s ease-out forwards`;
    }
});