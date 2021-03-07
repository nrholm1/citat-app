FROM golang:1.16-alpine3.13 as builder
COPY go.mod go.sum /go/src/nrholm1/citat-backend/
WORKDIR /go/src/nrholm1/citat-backend/
RUN go mod download
COPY . /go/src/nrholm1/citat-backend
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o build/citat-backend /go/src/nrholm1/citat-backend/

FROM alpine
RUN apk add --no-cache ca-certificates && update-ca-certificates
COPY --from=builder /go/src/nrholm1/citat-backend/ /usr/local/bin/nrholm1
EXPOSE 8080 8080
ENTRYPOINT ["/usr/bin/nrholm1"]

# Dockerfile not working - seems like the issues are with filesystem...