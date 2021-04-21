while test $# -gt 0; do
  case "$1" in
    -h|--help)
      echo "options:"
      echo "-h, --help           show brief help"
      echo "-m, --mode=MODE      specify the mode of running containers. Possible values: dev | prod | test"
      echo "-t, --type=TYPE      specify whether you want to stop, start or to restart the docker-compose."
      exit 0
      ;;
    -m)
      shift
      if test $# -gt 0; then
        export MODE=$1
      else
        echo "no mode specified"
        exit 1
      fi
      shift
      ;;
    --mode*)
        export MODE=`echo $1 | sed -e 's/^[^=]*=//g'`
        shift
      ;;
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

    docker build -t karpully/karpully-backend:latest .
    case $MODE in 
    prod)
      docker login -u karpully -p $KARPULLY_EMAIL_PASSWORD
      docker push karpully/karpully-backend:latest
      ;;
    esac; 
    docker-compose -f docker-compose.$MODE.yml up
    ;;
stop)
    docker-compose -f docker-compose.$MODE.yml down
    ;;
restart)

    docker build -t karpully/karpully-backend:latest .
    case $MODE in 
    prod)
      docker login -u karpully -p $KARPULLY_EMAIL_PASSWORD
      docker push karpully/karpully-backend:latest
      ;;
    esac;
    docker-compose -f docker-compose.$MODE.yml restart
    ;;
esac;
    