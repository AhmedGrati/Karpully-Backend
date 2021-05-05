while test $# -gt 0; do
  case "$1" in
    -t)
      shift
      if test $# -gt 0; then
        export TYPE=$1
      else
        echo "no output dir specified"
        exit 1
      fi
      shift
      ;;
    --type*)
      export TYPE=`echo $1 | sed -e 's/^[^=]*=//g'`
      shift
      ;;
    *)
      break
      ;;
  esac
done
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi
case $TYPE in
start)

    kubectl apply -f ./namespaces
    kubectl apply -f ./configs
    kubectl apply -f ./secrets
    kubectl apply -f ./networks
    kubectl apply -f ./provision-claims
    kubectl apply -f ./services
    kubectl apply -f ./deployments
    #kubectl apply -f ./tls
    ;;
stop)
    kubectl delete -f ./services
    kubectl delete -f ./deployments
    #kubectl delete -f ./provision-claims
    kubectl delete -f ./networks
    #kubectl delete -f ./tls    
    kubectl delete -f ./secrets
    kubectl delete -f ./configs
    #kubectl delete -f ./namespaces
    ;;
esac;
    