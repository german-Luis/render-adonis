const { Octokit } = require("@octokit/rest");
const fs = require('fs');


class HomeController {
  async index({ auth, view }) {
    const user = await auth.getUser()
    return view.render('welcome', {
      user: user || null
    })
  }
  async upload({response}) {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN || '', // Usando process.env para acceder a la variable de entorno GITHUB_TOKEN
    });

    const buff = fs.readFileSync('mensaje');
    const file = await octokit.repos.createOrUpdateFileContents({
      owner: 'Germancitom',
      repo: 'pruebas',
      path: 'mensaje',
      message: 'mensaje de actualizacion',
      content: buff.toString('base64'),
      //sha: '...', // Asumiendo que tenemos el SHA del archivo existente (para actualizar)
    })
    return response.json(file)
  }


}



module.exports = HomeController