global.SALT_KEY = 'rsa-key-20200402';
global.EMAIL_TMPL = '<strong>{0}</strong>';

module.exports = {
	connectionString: 'mongodb+srv://AlissonSouza:<password>@cluster0-6hjry.mongodb.net/test?retryWrites=true&w=majority',
	sendgridkey: 'tbd', //serve para enviar email
	containerConnectionString: 'TBD' //salvar imagens do produto
}