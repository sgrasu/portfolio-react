#!/usr/bin/env python3

import os
import json
import pyexiv2
import PIL
from PIL import Image
from PIL.ExifTags import TAGS

def main():
	data = {}
	data['photos'] = []
	path = '../photos'
	originals = os.fsencode(path+'/originals')
	for photo in os.listdir(originals):
		photoName = os.fsdecode(photo)
		if(not os.path.isfile(path+'/thmbnl/'+photoName)):
			resizing(path,photoName)
		metadata = extractMetadata(path,photoName)
		data['photos'].append({
			'title': photoName,
			'src': 'https://www.stefangrasu.com/photos/'+'full/'+photoName,
			'thmbnl': 'https://www.stefangrasu.com/photos/' + 'thmbnl/'+photoName,
			'metadata': metadata,
			'caption': metadata['caption']
			})
	with open('../src/info.js','w') as outfile:
		outfile.write('const data = ')
		json.dump(data,outfile)
		outfile.write('\nexport default data')

def resizing(path,photoName):
	img = Image.open(path+'/originals/'+photoName)
	width, height  = img.size
	fullRatio = 3000/width
	thmbnlRatio = 1050/width
	thmbnl = img.resize((int(width*thmbnlRatio),int(height*thmbnlRatio)),Image.ANTIALIAS)
	full = img.resize((int(width*fullRatio),int(height*fullRatio)),Image.ANTIALIAS)
	thmbnl.save(path+'/thmbnl/'+photoName)
	full.save(path+'/full/'+photoName)

def extractMetadata(path, photoName):
	metadata = pyexiv2.ImageMetadata(path+'/originals/'+photoName)
	metadata.read()
	try:
		country = metadata['Iptc.Application2.CountryName'].raw_value[0]
		caption = country
	except:
		caption = ''
		country = ''
	try:
		city = metadata['Iptc.Application2.City'].raw_value[0]
		caption = city +', ' + caption if caption else city
	except:
		city = ''

	try:
		title = metadata['Iptc.Application2.ObjectName'].raw_value[0]
		if title == city and caption:
			pass
		else:
			caption = title +' | ' + caption if caption else title
	except:
		if(city ==''):
			title = country
		else:
			title = city

	try:
		keyWords = metadata['Iptc.Application2.Keywords'].raw_value
	except:
		keyWords = []
	return {'country': country,
		'city': city,
		'title': title,
		'keyWords' : keyWords,
		'caption' : caption}


if __name__ == "__main__":
	main()