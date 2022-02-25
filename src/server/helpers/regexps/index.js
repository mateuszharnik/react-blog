export const usernameRegExp = /^([^@]+|(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;

export const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordRegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*~`])(?=.*[a-ząćęłńóśżź])(?=.*[A-ZĄĆĘŁŃÓŚŹŻ])[a-ząćęłńóśżźA-ZĄĆĘŁŃÓŚŹŻ0-9!@#$%^&*~`]{8,32}$/;

export const nameRegExp = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ]{2,32}$/;

export const dbIdRegExp = /^[a-f\d]{24}$/i;

export const instagramRegExp = /^https?:\/\/(www.)?instagram.com\/.*$/;

export const facebookRegExp = /^https?:\/\/(www.)?facebook.com\/.*$/;

export const twitterRegExp = /^https?:\/\/(www.)?twitter.com\/.*$/;

export const githubRegExp = /^https?:\/\/(www.)?github.com\/.*$/;
