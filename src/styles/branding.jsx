// import headerImage from "../assets/headerLogo.svg";
import translateImage from "../assets/translate.png";
import appIcon from '../assets/images/logo.svg'
import headerLogo from '../assets/images/headerLogo.svg'

const colors = {
  brand: {
    primaryColor: "#00B088",
    secondaryColor: "#0a3069",
    blueGradient:
      "radial-gradient(circle, rgba(110,160,255,1) 0%, rgba(255,255,255,1) 80%);",

    primaryColor1: "#EFDA2F",
    primaryColor2: "#3E6139",
    primaryColor3: "#A8D39E",
    primaryColor4: "#484848",

    secondaryColor1: "#FFFACD",
    secondaryColor2: "#F4F9F3",
    secondaryColor3: "#999999",

    tertiaryColor: "#F85858",

    blackColor1: "#040404",
    blackColor2: "#101828",
    blackColor3: "#212121",
  },
};

export default colors;

export const header = {
  headerContent: {
    id: "logo",
    title1: "Dragon Foods",
    title2: "Platform for Climate Resilience Data Highways",
    logoSrc: appIcon,
    headerLogo: headerLogo,
    appTitleColor: "#00B088",
    headerBgColor: "#EFEFEF"
  },
  languageDropdown: {
    translateImg: translateImage,
  },
  navLinks: [
    {
      id: "status",
      title: "Status",
      link: "status",
    },
    {
      id: "feedback",
      title: "Feedback",
      link: "feedback",
    },
  ],
};

export const courses = {
  courseDetails: {
    sectionTitle: "Your Courses",
    linkName: "See All",
  },
};

export const fonts = {
  primary: {
    color: "#040404",
    fontFamily: "Inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    letterSpacing: "0.32px",
  },
  secondary: {
    color: "#101828",
    fontFamily: "Inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    letterSpacing: "0.32px",
  },
  textDescription: {
    color: "#101828",
    fontFamily: "Inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    letterSpacing: "0.32px",
  },
  alertText: {
    color: "var(--gray-700, #2D3748)",
    fontFamily: "Inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "18px",
  },
  buttonText: {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "24px",
  },
};

export const buttonCss = {
  primaryBtnColor: 'rgba(76, 129, 63, 1)',
  primaryBtnHoverColor: '#3a6b2e',
  primaryTxtColor: '#FFF'
}

export const linkColor = {
  termsAndConditionColor : 'rgba(28, 121, 111, 1)' 
}