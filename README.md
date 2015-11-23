## Bluemix LoopBack Sample
This is a sample LoopBack Node.js application. It starts strong-pm (StrongLoop process manager) in Bluemix to start and supervise your application. You can then use StrongLoop Arc to remotely manage your Bluemix application.

### Deploy LoopBack Sample to Bluemix

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/strongloop-bluemix/loopback-example.git)

When you click this button, Bluemix will clone this repository into an IBM DevOps Services project, set up the deployment pipeline, and push your application to Bluemix.  Your application will get deployed with two routes.
```
<app_name>.mybluemix.net         # To access your sample application
<app_name>-pm.mybluemix.net      # To access Strong PM
```

### Deploy StrongLoop Arc

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/strongloop-bluemix/arc-app.git)

When you click this button, Bluemix will create and deploy an instance of StrongLoop Arc for your convenience.

### Connecting to the LoopBack application from Arc

Once the LoopBack application is deployed, launch Arc to manage the application.  You can do this by deploying Arc with the `Deploy to Bluemix` button above, or install and launch Arc locally.

To install and launch Arc locally:
>   In a CLI, globally install the strongloop client and then launch Arc. Node (and npm) is a prerequisite.
>   ```
>   npm install -g strongloop
>   slc arc
>   ```

Then, add your PM URL with port 80 into the Process Manager.  You can then use Arc to manage your remotely running application.
