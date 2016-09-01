writef = open('keys.js','w')
strings = []
# file = open('set-good.js','r')
for line in open('set-good.js','r'):
	parts = line.split(':')
	parts[0] = parts[0].lower()
	strings.append(':'.join(parts))
	# file[i] = file[i].lower()
	# strings.append(parts[0].lower())
# writef.write('\n'.join(strings))
writef.write(''.join(strings))
writef.close()