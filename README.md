Mesto.Analytics
===

This repo contains a bot that runs using `cron` and gathers statistics from
[Mesto.co](https://openland.com/mesto_community) in Openland and other sub-systems into a single database.


### System requirements:

1. Python 3.8+
2. PostgreSQL 11+


### How to run:

1. Install dependencies:

```
pip install -r requirements.txt
```

2. Create a new PostgreSQL database, initialize it with [init_tables.sql](init_tables.sql).

3. Configure environment variables for database connection, see [db.py](db.py).

4. Configure an environment variable `x_openland_token` for Openland authorization (take it from cookies of your own
account).

5. Configure `cron` to run scripts that have `__main__`. See [cronfile](cronfile).

```
crontab cronfile
crontab -e
crontab -l
```

Edit crontab and replace all `<replace>` items with valid security credentials.

To suppress Openland logs, set the value of environment variable `env_name` to `prod`, but usually these logs are useful
for local development and debugging.


### How to work with Openland

Openland works via websockets, see [openland.py](openland.py).

There is no documentation for Openland protocol. To understand how it works, open it in Chrome debugger, do some actions
in the web UI and track what is going on in websocket. Then replicate the same behavior in a script.

All queries to Openland use GraphQL syntax. 



### How to deploy new scripts

1. Configure your local `~/.ssh/config`:

```
Host mesto
    HostName 18.192.147.201
    User ubuntu
    IdentityFile ~/.ssh/your_private_ssh_key
```

2. SSH into AWS box: `ssh mesto`.

There are 3 main folders:

- `.ssh` - contains private SSH key used to integrate with GitHub and authorized_keys to manage access to the box;
- `MestoStatsBot` - contains this repo;
- `postgres` - local PostgreSQL dababase;

3. Go to `MestoStatsBot` folder, `git pull` the new changes, `crontab -e` to add a new script.

4. To monitor how existing scripts work, look for `script_name.log` files in `MestoStatsBot` folder.
