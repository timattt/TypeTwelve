## Команда для компиляции заглушки

```
protoc --proto_path=. messenger.proto --js_out=import_style=commonjs,binary:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
```