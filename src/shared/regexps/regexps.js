export const usernameRegExp = /^([^@]+|(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;

export const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordRegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*~`])(?=.*[a-ząćęłńóśżź])(?=.*[A-ZĄĆĘŁŃÓŚŹŻ])[a-ząćęłńóśżźA-ZĄĆĘŁŃÓŚŹŻ0-9!@#$%^&*~`]{8,32}$/;

export const nameRegExp = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ]{1,32}$/;

export const alphanumRegExp = /^[a-z0-9]+$/i;

export const dbIdRegExp = /^[a-f\d]{24}$/i;

export const websiteRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)$/i;

export const imageRegExp = /^(https?:\/\/.*\.(?:png|jpg|jpeg))$/i;

export const dribbbleRegExp = /^https?:\/\/(www.)?dribbble.com\/.*$/;

export const youtubeRegExp = /^https?:\/\/(www.)?youtube.com\/c\/.*$/;

export const twitchRegExp = /^https?:\/\/(www.)?twitch.tv\/.*$/;

export const stackOverflowRegExp = /^https?:\/\/(www.)?stackoverflow.com\/users\/.*$/;

export const linkedinRegExp = /^https?:\/\/(www.)?linkedin.com\/in\/.*$/;

export const instagramRegExp = /^https?:\/\/(www.)?instagram.com\/.*$/;

export const facebookRegExp = /^https?:\/\/(www.)?facebook.com\/.*$/;

export const twitterRegExp = /^https?:\/\/(www.)?twitter.com\/.*$/;

export const githubRegExp = /^https?:\/\/(www.)?github.com\/.*$/;
