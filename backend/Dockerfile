FROM golang:1.16-alpine3.13 AS GO_BUILD
COPY go.mod go.sum /go/src/nrholm1/citat-backend/
WORKDIR /go/src/nrholm1/citat-backend/
RUN go mod download
COPY . /go/src/nrholm1/citat-backend
RUN go build -o /go/bin/nrholm1/citat-backend

FROM alpine:3.13
WORKDIR /app
COPY --from=GO_BUILD /go/bin/nrholm1/ ./
EXPOSE 8080 8080
CMD ./citat-backend