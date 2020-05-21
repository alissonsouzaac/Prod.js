const mongoose = require('mongoose');
const Prod = mongoose.model('Prod');

exports.get = async() => {
	const res = await Prod.find({
		active: true
	}, 'title price slug');
	return res;
}

exports.getBySlug = async(slug) => {
	const res = await prod.findOne({
		slug: slug,
		active: true
	}, 'title price slug');
	return res;
}

exports.getById = async(id) => {
	const res = await prod.findById(id);
	return res;
}

exports.getByTag = async(tag) => {
	const res = await Prod.findOne({
		tag: tag,
		active: true
	},'title descrip tag price');
	return res;
}

exports.create = async(body) => {
	var product = new Prod(body);
	await prod.save();
}

exports.update = async(id, body) => {
	await Prod.findByIdAndUpdate(id, {
		$set: {
			title: body.title,
			description: body.description,
			price: body.price,
			slug: body.slug
		}
	});
}

exports.delete = async(id) => {
	await Prod.findOneAndRemove(id);
}