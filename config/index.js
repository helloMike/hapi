//引入env
const { env } = process;

module.exports = {
    port:env.PORT,
    host:env.HOST,
    wxAppid:env.WXAPPID,
    wxSecret:env.WXSECRET,
    jwtSecret:env.JWT_SECRET
}
