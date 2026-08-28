# NOTES - things I learned while setting all this up

Just my own notes so I don't have to re-learn everything next time. Might be
incomplete, sorry.

## Docker inside WSL is unstable

minikube inside a nested docker (I run kali-linux inside Windows WSL) keeps
crashing the node with exit code 255 every couple of minutes. The node restarts
but pods get recreated, which is annoying when you are mid apply. Workaround that
works for me:

```bash
minikube start --driver=docker --force
```

and re-run deploy.sh. It is flaky but it is the machine I have.

## emptyDir = data gone

Both prometheus and loki use emptyDir volumes. The pods lose all metrics/logs
when they restart. Fixed by re-apply + waiting, but really I need to learn
PersistentVolumes soon and give them a real home.

## next start needs HOSTNAME=0.0.0.0

For some reason Next.js standalone only listens on localhost unless you set
HOSTNAME. Took me a while to figure out why the docker container was not
answerable from outside.

## Building env vars into the image

The site reads NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY at build
time (they get baked into the client bundle). If you forget the --build-arg the
image builds fine but the reviews section silently shows nothing. I now source
.env.local in deploy.sh so I cannot forget.

## Grafana login via curl is weird

admin/admin works in the browser and works with curl basic auth
(`curl -u admin:admin`), but POST /api/login via curl returns 401 even though the
password is right. Some Grafana 11 thing. I gave up on scripting the login.

## kubectl port-forward must be re-run after WSL/minikube restarts

I keep a set of nohup port-forwards for 3080 (app), 3001 (grafana), 9091
(prometheus), 3101 (loki). Every time the WSL distro restarts they die and I have
to start them again. I turn them into a tiny script so it is one command.

## Supabase RLS

The anon key can only read approved rows; the reviews work because the policy is
open for read + insert but the security rules were the thing I had to double check
when reviews did not show up. Don't ever give the service-role key to the client.

## Commit dates

Tried to force-push a rewritten history to GitHub for this repo. It works
(--force-with-lease) but if anyone clones they lose their copy, so I only did it
once and stopped. Prefer normal small commits from now on.