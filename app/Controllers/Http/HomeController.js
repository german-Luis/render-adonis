const { Octokit } = require("@octokit/rest");



class HomeController {
  async index({ auth, view }) {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN || '', // Usando process.env para acceder a la variable de entorno GITHUB_TOKEN
    });
    const user = await auth.getUser()
  const fs = require('fs');
  const buff = fs.readFileSync('resources/views/login.edge');
  const file = await octokit.repos.createOrUpdateFileContents({
    owner: 'Germancitom',
    repo: 'pruebas',
    path: 'Hola',
    message: 'mensaje de actualizacion',
    content: buff.toString('base64'),
    //sha: '...', // Asumiendo que tenemos el SHA del archivo existente (para actualizar)
  });
    return view.render('welcome', {
      user: user || null
    })
    
  }


}



module.exports = HomeController