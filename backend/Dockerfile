FROM golang:1.14.6-alpine3.12 as builder
COPY go.mod go.sum /go/src/nrholm1/citat-backend/
WORKDIR /go/src/nrholm1/citat-backend/
RUN go mod download
COPY . /go/src/nrholm1/citat-backend
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o build/citat-backend /go/src/nrholm1/citat-backend/

FROM alpine
RUN apk add --no-cache ca-certificates && update-ca-certificates
COPY --from=builder /go/src/nrholm1/citat-backend/ /usr/bin/nrholm1
EXPOSE 8080 8080
ENTRYPOINT ["bash", /usr/bin/nrholm1]