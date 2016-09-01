#!"c:/Python27/python.exe" -u

from HTMLParser import HTMLParser
import re
import string

# parse a publication
class Parser(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.in_li = False
        self.current = ""
        self.data = []
        self.firstitem = False
    
    def handle_starttag(self, tag, attrs):
        if tag == 'li':
            self.data.append(self.current)
            self.current = ""
            self.in_li = True
            self.firstitem = True

    def handle_data(self, data):
        item = data
        if self.in_li:
            if self.firstitem:
                item = '"' + item + '"'
            self.current += data
            self.recording = False

sitef = open('site.txt','r')
parser = Parser() #get all documents
parser.feed(sitef.read())

strings = [line for line in parser.data if not re.match(r'^(\s*)$', line)]
# text = parser.data
# strings = parser.data
for i, text in enumerate(strings):
    parts = strings[i].split(' - ')
    # parts[0] = '"' + parts[0] + '"' + str(len(parts))
    # parts[1] = 'xxXX' + parts[1] + 'XXxx'
    # for j, part in enumerate(parts):
    #     parts[j] = '"' + parts[j] + '"'
    strings[i] = ': '.join(parts)

lines = ''.join(strings)
new = ""
for i, line in enumerate(lines.split('\n')):
    print(line)
    parts = line.split(': ')
    if len(parts) > 1:
        parts[0] = '"' + parts[0] + '"'
        parts[-1] = '"' + parts[-1] + '",'
    new += ': '.join(parts) + "\n"

vocabf = open('set.js','w')
vocabf.write(new)
sitef.close()
vocabf.close()
