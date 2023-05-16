const { Octokit } = require("@octokit/rest");



class HomeController {
  async index({ auth, view }) {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN || '', // Usando process.env para acceder a la variable de entorno GITHUB_TOKEN
    });
    const user = await auth.getUser()

    return view.render('welcome', {
      user: user || null
    })
  }



}



module.exports = HomeController