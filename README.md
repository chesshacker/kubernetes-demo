# Kubernetes Demo

## Install minikube

```
brew update
brew install --HEAD xhyve
brew install docker-machine-driver-xhyve
sudo chown root:wheel $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
sudo chmod u+s $(brew --prefix)/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
brew cask install minikube
```

## Start minikube

I like to setup an alias for this in my .bashrc file.

```
alias minikube-start='minikube start --vm-driver xhyve --insecure-registry localhost:5000'
```

## Kubernetes Setup

Based on:

* [Sharing a local registry with minikube](https://blog.hasura.io/sharing-a-local-registry-for-minikube-37c7240d0615)
* [Local Development with Kubernetes](https://mtpereira.com/local-development-k8s.html)

First, create a docker registry in kubernetes with:

```
kubectl create -f kube/kube-registry.yaml
```

Then forward its port to localhost with:

```
POD_NAME=$(kubectl get pods -l k8s-app=kube-registry -l version=v0 -n kube-system \
  -o jsonpath='{.items[0].metadata.name}')
kubectl port-forward -n kube-system $POD_NAME 5000:5000 &
```

Also setup the docker environment variables to use minikube:

```
eval $(minikube docker-env)
```

To build and push a new image:

```
docker build -t localhost:5000/kubernetes-demo/kubernetes-demo:latest .
docker push localhost:5000/kubernetes-demo/kubernetes-demo:latest
```

To create the app and service for the first time:

```
kubectl create -f kube/deploy-demo.yaml
kubectl create -f kube/svc-http.yaml
```

To open the demo web page:

```
open "http://$(minikube ip):$(kubectl get svc -l app=kubernetes-demo -o jsonpath='{.items[0].spec.ports[0].nodePort}')"
```

To load a new version of the image, delete the pod with the existing version:

```
kubectl delete pods/$(kubectl get pods -l app=kubernetes-demo -o jsonpath='{.items[0].metadata.name}')
```
