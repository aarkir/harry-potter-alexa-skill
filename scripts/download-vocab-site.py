import urllib2


# get a site's html
def getHTML(website):
    response = urllib2.urlopen(website)
    return response.read()

f = open('site.txt','w')
f.write(getHTML('https://en.wikipedia.org/wiki/List_of_Harry_Potter_characters')) # python will convert \n to os.linesep
f.close() # you can omit in most cases as the destructor will call it
